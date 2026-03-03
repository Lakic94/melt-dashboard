"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pencil, Check, X } from "lucide-react";
import dynamic from "next/dynamic";

const ReferralTree = dynamic(() => import("@/components/referral/referral-tree"), {
  ssr: false,
  loading: () => <div className="flex h-[400px] items-center justify-center text-sm text-muted-foreground">Loading tree...</div>,
});

interface TreeNode {
  id: string;
  name: string;
  referralCode: string;
  children: TreeNode[];
}

export default function ReferralsTab() {
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  // Edit mode state
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editError, setEditError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [codeRes, treeRes] = await Promise.all([
        fetch("/api/referrals/code"),
        fetch("/api/referrals/tree"),
      ]);
      const codeData = await codeRes.json();
      const treeData = await treeRes.json();

      if (codeData.referralCode) {
        setReferralCode(codeData.referralCode);
        setReferralLink(codeData.referralLink);
      }
      if (treeData.tree) {
        setTree(treeData.tree);
      }
    } catch (error) {
      console.error("Failed to fetch referral data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = referralLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function startEditing() {
    setEditValue(referralCode);
    setEditError("");
    setEditing(true);
  }

  function cancelEditing() {
    setEditing(false);
    setEditValue("");
    setEditError("");
  }

  async function saveCode() {
    const trimmed = editValue.trim();
    if (!trimmed || trimmed.length < 2 || trimmed.length > 30) {
      setEditError("Code must be between 2 and 30 characters");
      return;
    }

    setSaving(true);
    setEditError("");

    try {
      const res = await fetch("/api/referrals/code", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setEditError(data.error || "Failed to update code");
        return;
      }

      setReferralCode(data.referralCode);
      setReferralLink(data.referralLink);
      setEditing(false);
    } catch {
      setEditError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const totalReferrals = tree ? countNodes(tree) - 1 : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Code</CardTitle>
          <CardDescription>Share this code or link with friends to grow your network</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            {editing ? (
              <>
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="max-w-xs font-mono"
                  maxLength={30}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveCode();
                    if (e.key === "Escape") cancelEditing();
                  }}
                />
                <Button variant="ghost" size="icon" onClick={saveCode} disabled={saving}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={cancelEditing} disabled={saving}>
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Badge variant="secondary" className="px-4 py-2 text-lg font-mono">
                  {loading ? "..." : referralCode}
                </Badge>
                <Button variant="ghost" size="icon" onClick={startEditing} disabled={loading}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          {editError && (
            <p className="text-sm text-destructive">{editError}</p>
          )}
          <div className="flex gap-2">
            <Input value={referralLink} readOnly className="font-mono text-sm" />
            <Button variant="outline" onClick={handleCopy} disabled={!referralLink}>
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Referral Network</CardTitle>
              <CardDescription>
                {totalReferrals === 0
                  ? "No referrals yet. Share your code to get started!"
                  : `${totalReferrals} referral${totalReferrals === 1 ? "" : "s"} in your network`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex h-[400px] items-center justify-center text-sm text-muted-foreground">
              Loading...
            </div>
          ) : tree && totalReferrals > 0 ? (
            <div className="h-[500px] w-full rounded-lg border">
              <ReferralTree data={tree} />
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
              Your referral tree will appear here once someone signs up with your code
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function countNodes(node: TreeNode): number {
  return 1 + node.children.reduce((sum, child) => sum + countNodes(child), 0);
}
