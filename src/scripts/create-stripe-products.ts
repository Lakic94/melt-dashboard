/**
 * Creates test-mode Stripe products + one-time prices matching the live account.
 *
 * Usage: bun run src/scripts/create-stripe-products.ts
 *
 * Outputs env vars to paste into .env.local
 */

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface ProductDef {
  envKey: string;
  name: string;
  amount: number; // cents
}

const productDefs: ProductDef[] = [
  { envKey: "STRIPE_PRICE_3_CASE", name: "3 Cases of SOULdiers - 72 Bottles", amount: 21600 },
  { envKey: "STRIPE_PRICE_6_CASE", name: "6 Cases of SOULdiers - 144 Bottles", amount: 43200 },
  { envKey: "STRIPE_PRICE_9_CASE", name: "9 Cases of SOULdiers - 216 Bottles", amount: 64800 },
  { envKey: "STRIPE_PRICE_12_CASE", name: "12 Cases of SOULdiers - 288 Bottles", amount: 86400 },
  { envKey: "STRIPE_PRICE_DONATION", name: "Impact Fund Donation", amount: 75 },
];

async function main() {
  console.log("Creating products in Stripe test mode...\n");

  const envLines: string[] = [];

  for (const def of productDefs) {
    const product = await stripe.products.create({ name: def.name });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: def.amount,
      currency: "usd",
    });

    const dollars = (def.amount / 100).toFixed(2);
    console.log(`  ${def.name}: $${dollars}`);
    console.log(`    product: ${product.id}`);
    console.log(`    price:   ${price.id}\n`);

    envLines.push(`${def.envKey}=${price.id}`);
  }

  console.log("=== Add these to your .env.local ===\n");
  console.log(envLines.join("\n"));
  console.log();

  process.exit(0);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
