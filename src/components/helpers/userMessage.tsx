import React from "react";

import IconUser from "../ui/icons/IconUser";

export default function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex flex-row-reverse items-start flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] py-3">
      {/* <div className="flex-shrink-0 flex flex-col relative items-end">
        <div>
          <div className="rounded-full border border-[#d9d9d9]">
            <div className="gizmo-bot-avatar flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
              <div className="relative p-1 rounded-sm flex items-center justify-center bg-token-main-surface-primary text-token-text-primary h-8 w-8">
                <IconUser width={41} height={41} fill="#12BBC4" />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div
        className="flex-1 space-y-2 overflow-hidden break-words whitespace-pre-wrap bg-[#f2f2f2] px-5 py-2.5 max-w-[70%] border border-[#d9d9d9]"
        style={{ borderRadius: "20px 0 0 20px" }}
      >
        {children}
      </div>
    </div>
  );
}
