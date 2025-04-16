"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAIState, useUIState } from "ai/rsc";

import { Message } from "../types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import useScrollAnchor from "@/hooks/useScrollAnchor";
import { cn } from "../utils";
import ChatPanel from "./components/chatPanel";
import ChatList from "./components/chatList";
import EmptyScreen from "./components/emptyScreen";
import ScrollToBottomButton from "./components/widgets/scrollToBottomButton";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
  // session?: Session
  //   missingKeys: string[]; // to show missing env variables
}

export default function Chat({ id, className }: ChatProps) {
  const router = useRouter();
  const path = usePathname();

  const [messages] = useUIState();
  const [aiState] = useAIState();

  const [_, setNewChatId] = useLocalStorage("newChatId", id);

  React.useEffect(() => {
    if (!path.includes("chat") && messages.length === 1) {
      window.history.replaceState({}, "", `/chat/${id}`);
    }
  }, [id, path, messages]);

  React.useEffect(() => {
    const messagesLength = aiState.messages?.length;
    if (messagesLength === 2) router.refresh();
  }, [aiState.messages, router]);

  React.useEffect(() => {
    setNewChatId(id);
  }, [id]);

  const { messagesRef, scrollRef, visibilityRef, scrollToBottom, isAtBottom, isVisible } = useScrollAnchor();

  return (
    <div ref={scrollRef} className="relative group w-full mx-auto overflow-auto pl-0">
      <div ref={messagesRef} className={cn("pb-[150px] pt-4 md:pt-10", className)}>
        {messages.length ? <ChatList messages={messages} /> : <EmptyScreen />}
        <div className="w-full h-px" ref={visibilityRef} />
      </div>

      <ScrollToBottomButton isAtBottom={isAtBottom} scrollToBottom={scrollToBottom} />

      <ChatPanel />
    </div>
  );
}
