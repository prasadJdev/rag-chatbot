"use client";

import { StreamableValue } from "ai/rsc";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { cn } from "@/lib/utils";
import { useStreamableText } from "@/hooks/useStreamableText";
import { MemoizedReactMarkdown } from "@/lib/markdown/memoizedReactMarkdown";

import IconAI from "../ui/icons/IconAI";

export default function BotMessage({
  content,
  className,
  data,
}: {
  data: {}[];
  content: string | StreamableValue<string>;
  className?: string;
  isStreaming?: boolean;
}) {
  const text = useStreamableText(content);

  return (
    <div
      className={cn(
        "mx-auto flex items-start flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] py-3",
        className
      )}
    >
      <div className="flex-shrink-0 flex flex-col relative items-end">
        <div>
          <div className="pt-0 rounded-full border border-[#d9d9d9]">
            <div className="p-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
              <div className="relative p-1 rounded-sm flex items-center justify-center bg-token-main-surface-primary text-token-text-primary h-8 w-8">
                <IconAI fill="#12BBC4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex-1 space-y-2 overflow-hidden"> */}
      <div
        className="flex-1 space-y-2 overflow-hidden bg-[#f1f1f1] px-5 py-2.5 border border-[#d9d9d9]"
        style={{ borderRadius: "0 20px 20px 0" }}
      >
        <MemoizedReactMarkdown
          className="markdown prose break-words whitespace-pre-wrap dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0 first:mt-0">{children}</p>;
            },

            //   Let's look at code generation later -- but remeber we are gonna need it

            //   code({ node, inline, className, children, ...props }) {
            //     if (children.length) {
            //       if (children[0] == '▍') {
            //         return (
            //           <span className="mt-1 animate-pulse cursor-default">▍</span>
            //         )
            //       }

            //       children[0] = (children[0] as string).replace('`▍`', '▍')
            //     }

            //     const match = /language-(\w+)/.exec(className || '')

            //     if (inline) {
            //       return (
            //         <code className={className} {...props}>
            //           {children}
            //         </code>
            //       )
            //     }

            //     return (
            //       <CodeBlock
            //         key={Math.random()}
            //         language={(match && match[1]) || ''}
            //         value={String(children).replace(/\n$/, '')}
            //         {...props}
            //       />
            //     )
            //   }
          }}
        >
          {text}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
}
