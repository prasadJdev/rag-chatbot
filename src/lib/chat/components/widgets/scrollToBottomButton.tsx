"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import IconArrowDown from "@/components/ui/icons/IconArrowDown";

interface ButtonScrollToBottomProps extends ButtonProps {
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

export default function ScrollToBottomButton({
  className,
  isAtBottom,
  scrollToBottom,
  ...props
}: ButtonScrollToBottomProps) {
  if (isAtBottom) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "cursor-pointer size-8 fixed bottom-[120px] z-10 rounded-full bg-clip-padding border border-[#EBEBEB] text-token-text-secondary border-token-border-light right-1/2 translate-x-1/2 bg-token-main-surface-primary bg-[#f8f8f8]",
        className
      )}
      onClick={() => scrollToBottom()}
      {...props}
    >
      <IconArrowDown className="stroke-[#b1b1b1]" />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  );
}
