import IconAI from "../ui/icons/IconAI";

function SpinnerMessage() {
  return (
    <div className="mx-auto flex items-start flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] py-3">
      <div className="flex-shrink-0 flex flex-col relative items-end">
        <div>
          <div className="pt-0 rounded-full border border-[#d9d9d9]">
            <div className="border p-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
              <div className="relative p-1 rounded-sm flex items-center justify-center bg-token-main-surface-primary text-token-text-primary h-8 w-8">
                <IconAI width={41} height={41} fill="#12BBC4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start flex-1 space-y-2 overflow-hidden px-1">
        <h2 className="bg-gray-200 animate-pulse h-4 w-2/3 mb-2" />
        <h1 className="w-full mb-4 h-6 animate-pulse bg-gray-300" />
        <p className="leading-relaxed mb-3 w-full h-3 animate-pulse bg-gray-200" />
        <p className="leading-relaxed mb-3 w-full h-3 animate-pulse bg-gray-200" />
        <p className="leading-relaxed mb-3 w-full h-3 animate-pulse bg-gray-200" />
        <p className="leading-relaxed mb-3 w-full h-3 animate-pulse bg-gray-200" />
        <p className="leading-relaxed mb-3 w-full h-3 animate-pulse bg-gray-200" />
      </div>
    </div>
  );
}

export default SpinnerMessage;
