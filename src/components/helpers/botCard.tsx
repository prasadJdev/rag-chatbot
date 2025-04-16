import React from "react";

import { cn } from "@/lib/utils";

import IconAI from "../ui/icons/IconAI";

export default function BotCard({ children, showAvatar = true }: { children: React.ReactNode; showAvatar?: boolean }) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          "flex size-[24px] fill-black shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm",
          !showAvatar && "invisible"
        )}
      >
        <IconAI fill="#12BBC4" />
      </div>
      <div className="ml-4 flex-1 pl-2">{children}</div>
    </div>
  );
}
