/**
 * Seed script: creates test users with referral trees via direct DB inserts.
 *
 * Usage: bun run src/scripts/seed-referrals.ts
 *
 * Creates:
 * - Tree A: Random branching, 5-10 levels deep
 * - Tree B: 20 levels deep with branching (2-4 children at various levels)
 *
 * All users get password: "testtest"
 */

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { nanoid } from "nanoid";
import { scryptAsync } from "@noble/hashes/scrypt.js";
import { bytesToHex } from "@noble/hashes/utils.js";
import * as schema from "../lib/db/schema";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const db = drizzle(client, { schema });

async function cleanSeedData() {
  console.log("Cleaning previous seed data...");
  await client.batch([
    // First, null out referred_by references pointing to seed users (from any user)
    { sql: `UPDATE user_profiles SET referred_by = NULL WHERE referred_by IN (SELECT id FROM user WHERE email LIKE 'seed-%@test.com')`, args: [] },
    { sql: `DELETE FROM user_profiles WHERE user_id IN (SELECT id FROM user WHERE email LIKE 'seed-%@test.com')`, args: [] },
    { sql: `DELETE FROM account WHERE userId IN (SELECT id FROM user WHERE email LIKE 'seed-%@test.com')`, args: [] },
    { sql: `DELETE FROM session WHERE userId IN (SELECT id FROM user WHERE email LIKE 'seed-%@test.com')`, args: [] },
    { sql: `DELETE FROM purchases WHERE user_id IN (SELECT id FROM user WHERE email LIKE 'seed-%@test.com')`, args: [] },
    { sql: `DELETE FROM user WHERE email LIKE 'seed-%@test.com'`, args: [] },
  ]);
  console.log("Cleaned.\n");
}

// Must match Better Auth's password hashing exactly (scrypt from @noble/hashes)
async function hashPassword(password: string): Promise<string> {
  const salt = bytesToHex(crypto.getRandomValues(new Uint8Array(16)));
  const key = await scryptAsync(password.normalize("NFKC"), salt, {
    N: 16384,
    r: 16,
    p: 1,
    dkLen: 64,
    maxmem: 128 * 16384 * 16 * 2,
  });
  return `${salt}:${bytesToHex(key)}`;
}

interface SeedUser {
  id: string;
  name: string;
  email: string;
  referralCode: string;
}

let userCount = 0;

async function createUser(name: string, email: string, referredByUserId: string | null, passwordHash: string): Promise<SeedUser> {
  const userId = nanoid();
  const referralCode = nanoid(8);
  const now = new Date();

  // Batch insert: user + account + profile in one go
  await client.batch([
    {
      sql: `INSERT INTO user (id, name, email, emailVerified, createdAt, updatedAt) VALUES (?, ?, ?, 0, ?, ?)`,
      args: [userId, name, email, now.getTime() / 1000, now.getTime() / 1000],
    },
    {
      sql: `INSERT INTO account (id, accountId, providerId, userId, password, createdAt, updatedAt) VALUES (?, ?, 'credential', ?, ?, ?, ?)`,
      args: [nanoid(), userId, userId, passwordHash, now.getTime() / 1000, now.getTime() / 1000],
    },
    {
      sql: `INSERT INTO user_profiles (id, user_id, referral_code, referred_by) VALUES (?, ?, ?, ?)`,
      args: [nanoid(), userId, referralCode, referredByUserId],
    },
  ]);

  userCount++;
  return { id: userId, name, email, referralCode };
}

async function createRandomTree(prefix: string, rootEmail: string, minDepth: number, maxDepth: number, passwordHash: string) {
  console.log(`\nTree "${prefix}": branching ${minDepth}-${maxDepth} levels deep`);

  const root = await createUser(`${prefix} Root`, rootEmail, null, passwordHash);
  console.log(`  Root: ${root.email} (code: ${root.referralCode})`);

  const targetDepth = minDepth + Math.floor(Math.random() * (maxDepth - minDepth + 1));
  let currentLevel: SeedUser[] = [root];
  let levelNum = 0;

  for (let depth = 1; depth <= targetDepth; depth++) {
    const nextLevel: SeedUser[] = [];

    // Create children in parallel per level
    const promises: Promise<SeedUser>[] = [];

    for (const parent of currentLevel) {
      const numChildren = depth <= 2 ? 2 + Math.floor(Math.random() * 3) : 1 + Math.floor(Math.random() * 2);

      for (let c = 0; c < numChildren; c++) {
        const idx = userCount + promises.length + 1;
        const name = `${prefix} L${depth}-${c + 1}`;
        const email = `seed-${prefix.toLowerCase()}-${idx}-${nanoid(4)}@test.com`;
        promises.push(createUser(name, email, parent.id, passwordHash));
      }
    }

    const results = await Promise.all(promises);
    nextLevel.push(...results);
    levelNum = depth;
    console.log(`  Level ${depth}: ${results.length} users`);

    // Keep 1-3 nodes to branch from next level
    currentLevel = nextLevel.sort(() => Math.random() - 0.5).slice(0, Math.min(3, nextLevel.length));
  }

  console.log(`  Done: ${levelNum} levels`);
  return root;
}

async function createDeepTree(prefix: string, rootEmail: string, depth: number, passwordHash: string) {
  console.log(`\nTree "${prefix}": ${depth} levels deep with branching`);

  const root = await createUser(`${prefix} Root`, rootEmail, null, passwordHash);
  console.log(`  Root: ${root.email} (code: ${root.referralCode})`);

  let mainChain: SeedUser = root;

  for (let d = 1; d <= depth; d++) {
    const promises: Promise<SeedUser>[] = [];

    // Main chain continues (always 1 child going deeper)
    const mainName = `${prefix} D${d}`;
    const mainEmail = `seed-${prefix.toLowerCase()}-d${d}-${nanoid(4)}@test.com`;
    const mainPromise = createUser(mainName, mainEmail, mainChain.id, passwordHash);
    promises.push(mainPromise);

    // Add side branches at various levels for diversity
    let sideBranches = 0;
    if (d % 2 === 0) sideBranches = 1 + Math.floor(Math.random() * 2);       // every 2nd level: 1-2 extra
    if (d % 5 === 0) sideBranches = 2 + Math.floor(Math.random() * 3);       // every 5th level: 2-4 extra
    if (d <= 3) sideBranches = 2 + Math.floor(Math.random() * 2);            // first 3 levels: 2-3 extra

    for (let s = 0; s < sideBranches; s++) {
      const sideName = `${prefix} D${d}S${s + 1}`;
      const sideEmail = `seed-${prefix.toLowerCase()}-d${d}s${s + 1}-${nanoid(4)}@test.com`;
      promises.push(createUser(sideName, sideEmail, mainChain.id, passwordHash));
    }

    const results = await Promise.all(promises);
    mainChain = results[0]; // first one is the main chain

    if (d % 5 === 0 || d === depth) {
      console.log(`  Level ${d}: ${results.length} users (${results.length - 1} side branches)`);
    }
  }

  console.log(`  Done: ${depth} levels`);
  return root;
}

async function main() {
  console.log("=== MELT Referral Seed Script (fast) ===\n");

  await cleanSeedData();

  // Pre-hash the shared password once
  const passwordHash = await hashPassword("testtest");
  console.log("Password hashed.\n");

  const start = Date.now();

  // Run both trees concurrently
  const [treeA, treeB] = await Promise.all([
    createRandomTree("TreeA", "seed-treea-root@test.com", 5, 10, passwordHash),
    createDeepTree("Deep", "seed-deep-root@test.com", 20, passwordHash),
  ]);

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n=== Done! ${userCount} users created in ${elapsed}s ===`);
  console.log(`\nLogin with password "testtest":`);
  console.log(`  Tree A root: seed-treea-root@test.com`);
  console.log(`  Deep root:   seed-deep-root@test.com`);

  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
