"use client";

import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme-switcher";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    value: "invitation",
    icon: (
      <svg className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    label: "Buy Product",
    href: "/dashboard/buy",
    value: "buy",
    icon: (
      <svg className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
  },
  {
    label: "Referrals",
    href: "/dashboard/referrals",
    value: "referrals",
    icon: (
      <svg className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
];

function getActiveNav(pathname: string) {
  if (pathname === "/dashboard") return "invitation";
  if (pathname.startsWith("/dashboard/buy")) return "buy";
  if (pathname.startsWith("/dashboard/referrals")) return "referrals";
  return "invitation";
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const activeNav = getActiveNav(pathname);
  const userName = session?.user?.name || "there";

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 flex w-[220px] flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        {/* Logo */}
        <div className="flex h-16 items-center px-5">
          <img src="/melt_logo.png" alt="MELT Brands" className="h-7 w-auto" />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pt-4">
          <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/60">
            Menu
          </p>
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeNav === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => router.push(item.href)}
                  className={cn(
                    "relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[14px] font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-sidebar-primary" />
                  )}
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Theme switcher */}
        <div className="border-t border-sidebar-border px-3 pt-2">
          <ThemeSwitcher />
        </div>

        {/* User footer */}
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            {/* Avatar */}
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary/15">
              <span className="text-xs font-semibold text-sidebar-primary">
                {(session?.user?.name || session?.user?.email || "?").charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                {session?.user?.name || "User"}
              </p>
              <p className="truncate text-[11px] text-sidebar-foreground/60">
                {session?.user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-2 py-2 text-[13px] text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <svg className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 pl-[220px]">
        {/* Page header — greeting style */}
        <div className="px-10 pt-10 pb-6">
          <h1 className="text-2xl font-semibold text-foreground">
            Hello, {userName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s what&apos;s going on today.
          </p>
        </div>

        {/* Page content */}
        <div className="px-10 pb-10">
          {children}
        </div>
      </main>
    </div>
  );
}
