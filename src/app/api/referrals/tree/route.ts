import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { client } from "@/lib/db";

interface TreeNode {
  id: string;
  name: string;
  referralCode: string;
  children: TreeNode[];
}

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Recursive CTE to get the full referral tree rooted at the current user
  const result = await client.execute({
    sql: `WITH RECURSIVE referral_tree AS (
      SELECT u.id, u.name, up.referral_code, up.referred_by, 0 as depth
      FROM user u
      JOIN user_profiles up ON up.user_id = u.id
      WHERE u.id = ?
      UNION ALL
      SELECT u.id, u.name, up.referral_code, up.referred_by, rt.depth + 1
      FROM user u
      JOIN user_profiles up ON up.user_id = u.id
      JOIN referral_tree rt ON up.referred_by = rt.id
    )
    SELECT id, name, referral_code, referred_by, depth FROM referral_tree ORDER BY depth`,
    args: [session.user.id],
  });

  // Build nested tree from flat rows
  const nodeMap = new Map<string, TreeNode>();
  let root: TreeNode | null = null;

  for (const row of result.rows) {
    const node: TreeNode = {
      id: row.id as string,
      name: row.name as string,
      referralCode: row.referral_code as string,
      children: [],
    };
    nodeMap.set(node.id, node);

    if (node.id === session.user.id) {
      root = node;
    } else {
      const referredBy = row.referred_by as string | null;
      if (referredBy && nodeMap.has(referredBy)) {
        nodeMap.get(referredBy)!.children.push(node);
      }
    }
  }

  return NextResponse.json({ tree: root });
}
