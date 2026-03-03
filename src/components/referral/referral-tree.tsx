"use client";

import Tree from "react-d3-tree";
import { useMemo } from "react";

interface TreeNode {
  id: string;
  name: string;
  referralCode: string;
  children: TreeNode[];
}

interface ReferralTreeProps {
  data: TreeNode;
}

function toD3Tree(node: TreeNode): any {
  return {
    name: node.name,
    attributes: { code: node.referralCode },
    children: node.children.map(toD3Tree),
  };
}

function renderCustomNode({ nodeDatum }: any) {
  return (
    <g>
      <circle r={20} fill="hsl(var(--primary))" opacity={0.9} />
      <text
        fill="white"
        strokeWidth={0}
        x={0}
        y={5}
        textAnchor="middle"
        fontSize={12}
        fontWeight="bold"
      >
        {(nodeDatum.name as string)?.charAt(0)?.toUpperCase() || "?"}
      </text>
      <text
        fill="currentColor"
        strokeWidth={0}
        x={0}
        y={42}
        textAnchor="middle"
        fontSize={12}
      >
        {nodeDatum.name}
      </text>
      <text
        fill="hsl(var(--muted-foreground))"
        strokeWidth={0}
        x={0}
        y={56}
        textAnchor="middle"
        fontSize={10}
      >
        {nodeDatum.attributes?.code}
      </text>
    </g>
  );
}

export default function ReferralTree({ data }: ReferralTreeProps) {
  const d3Data = useMemo(() => toD3Tree(data), [data]);

  return (
    <Tree
      data={d3Data}
      orientation="vertical"
      pathFunc="step"
      translate={{ x: 300, y: 50 }}
      separation={{ siblings: 1.5, nonSiblings: 2 }}
      nodeSize={{ x: 160, y: 120 }}
      renderCustomNodeElement={renderCustomNode}
      zoomable
      draggable
    />
  );
}
