"use client";

import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="flex items-center gap-2 px-2 py-2">
      <span className="text-[11px] font-medium text-sidebar-foreground/60">
        Theme
      </span>
      <div className="flex items-center gap-1.5">
        {themes.map((t) => {
          const isActive = theme === t.value;
          return (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              title={t.label}
              className={cn(
                "size-5 rounded-full border-2 transition-all",
                isActive
                  ? "border-sidebar-foreground scale-110"
                  : "border-transparent hover:scale-110"
              )}
              style={{ backgroundColor: t.preview }}
            />
          );
        })}
      </div>
    </div>
  );
}
