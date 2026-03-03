"use client";

import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth/auth-client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const tabs = [
  { value: "invitation", label: "Invitation", href: "/dashboard" },
  { value: "buy", label: "Buy Product", href: "/dashboard/buy" },
  { value: "referrals", label: "Referrals", href: "/dashboard/referrals" },
];

function getActiveTab(pathname: string) {
  if (pathname === "/dashboard") return "invitation";
  if (pathname.startsWith("/dashboard/buy")) return "buy";
  if (pathname.startsWith("/dashboard/referrals")) return "referrals";
  return "invitation";
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const activeTab = getActiveTab(pathname);

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold tracking-tight">MELT</h1>
          <div className="flex items-center gap-4">
            {session?.user && (
              <span className="text-sm text-muted-foreground">{session.user.email}</span>
            )}
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6">
        <Tabs value={activeTab} className="w-full">
          <TabsList className="mb-6">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                onClick={() => router.push(tab.href)}
                className="cursor-pointer"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {children}
      </div>
    </div>
  );
}
