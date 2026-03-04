"use client";

import Tree from "react-d3-tree";
import { useCallback, useMemo, useState } from "react";

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

const CARD_W = 160;
const CARD_H = 56;

function renderCustomNode({ nodeDatum }: any) {
  const name = nodeDatum.name as string;
  const code = nodeDatum.attributes?.code as string;
  const initial = name?.charAt(0)?.toUpperCase() || "?";

  return (
    <g>
      {/* Card background */}
      <rect
        x={-CARD_W / 2}
        y={-CARD_H / 2}
        width={CARD_W}
        height={CARD_H}
        rx={10}
        ry={10}
        fill="var(--card)"
        stroke="var(--border)"
        strokeWidth={1}
      />

      {/* Avatar circle */}
      <circle cx={-CARD_W / 2 + 30} cy={0} r={16} fill="var(--primary)" />

      {/* Use foreignObject for crisp HTML text rendering */}
      <foreignObject x={-CARD_W / 2} y={-CARD_H / 2} width={CARD_W} height={CARD_H}>
        <div
          style={{
            width: CARD_W,
            height: CARD_H,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            gap: 10,
            boxSizing: "border-box",
          }}
        >
          {/* Avatar initial */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: "white",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "var(--font-gt-era), Arial, sans-serif",
            }}
          >
            {initial}
          </div>

          {/* Name + code */}
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--foreground)",
                fontFamily: "var(--font-gt-era), Arial, sans-serif",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: 1.3,
              }}
            >
              {name}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "var(--muted-foreground)",
                fontFamily: "Arial, sans-serif",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: 1.3,
              }}
            >
              {code}
            </div>
          </div>
        </div>
      </foreignObject>
    </g>
  );
}

export default function ReferralTree({ data }: ReferralTreeProps) {
  const d3Data = useMemo(() => toD3Tree(data), [data]);
  const [containerWidth, setContainerWidth] = useState(800);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setContainerWidth(node.offsetWidth);
    }
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Tree
        data={d3Data}
        orientation="vertical"
        pathFunc="step"
        translate={{ x: containerWidth / 2, y: 50 }}
        separation={{ siblings: 1.8, nonSiblings: 2.5 }}
        nodeSize={{ x: 200, y: 120 }}
        renderCustomNodeElement={renderCustomNode}
        zoomable
        draggable
        pathClassFunc={() => "referral-tree-link"}
      />
    </div>
  );
}
