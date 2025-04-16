import React from "react";

export default function IconSend({ stroke, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        stroke={stroke}
        d="m10.359 13.724 1.894 4.42c.26.608 1.072.672 1.397.096a45 45 0 0 0 2.542-5.35c1.667-4.166 2.5-7.5 2.5-7.5s-3.333.834-7.5 2.5a45 45 0 0 0-5.349 2.543c-.576.325-.512 1.136.097 1.397z"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
