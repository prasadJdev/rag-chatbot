"use client";

import React from "react";
import { useActions, useUIState } from "ai/rsc";

import { AI } from "../../actions";

import useEnterSubmit from "@/hooks/useEnterSubmit";
import { cn, nanoid } from "@/lib/utils";
import UserMessage from "@/components/helpers/userMessage";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import IconSend from "@/components/ui/icons/IconSend";
import { spinner } from "@/components/helpers/widgets/spinner";
import SpinnerMessage from "@/components/helpers/spinnerMessage";

export default function PromptForm() {
  const [input, setInput] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const { formRef, onKeyDown } = useEnterSubmit();

  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const { submitUserMessage } = useActions();

  const [_, setMessages] = useUIState<typeof AI>();

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef.current]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Blur focus on mobile
    if (window.innerWidth < 600) {
      // event.
    }

    const value = input.trim();
    setInput("");
    if (!value) return;

    // Optimistically add user message to UI
    setMessages((curr) => [
      ...curr,
      { id: nanoid(), display: <UserMessage>{value}</UserMessage> },
      { id: "Loading", display: <SpinnerMessage /> },
    ]);

    setIsLoading(true);
    const responseMessage = await submitUserMessage(value);
    setIsLoading(false);

    setMessages((curr) => [...curr.filter(({ id }) => id !== "Loading"), responseMessage]);
  };

  const disabled = input === "";

  return (
    <form ref={formRef} className="flex items-center gap-1.5 md:gap-2" onSubmit={handleSubmit}>
      <Textarea
        ref={inputRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        placeholder="Jot down your queries"
        className="min-h-[60px] w-full resize-none bg-transparent px-6 py-[1.3rem] border border-[#d9d9d9] focus-within:outline-none sm:text-sm bg-white border-t shadow-lg rounded-full sm:border"
        autoFocus
        disabled={isLoading}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        name="message"
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="submit"
            className={cn("rounded-full h-[50px] w-[50px] p-1 border border-[#d9d9d9]", disabled && "drop-shadow-lg")}
            variant={disabled ? "disabled" : "default"}
            disabled={disabled}
          >
            {isLoading ? (
              spinner
            ) : (
              <>
                <IconSend stroke={disabled ? "#f1f1f1" : "#ffff"} />
                <span className="sr-only">Ask</span>
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Ask</TooltipContent>
      </Tooltip>
    </form>
  );
}
