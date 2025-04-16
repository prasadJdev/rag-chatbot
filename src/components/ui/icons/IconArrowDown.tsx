import { cn } from "@/lib/utils";

export default function IconArrowDown({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={cn(className)} viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 5v14m0 0-6-6m6 6 6-6" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
