import React, { FC, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const Logo: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div
    className={cn(
      "tw-w-max tw-border-2 tw-border-primary tw-p-3 tw-font-digit tw-text-3xl tw-font-bold tw-shadow-[6px_6px]",
      className,
    )}
    {...props}
  >
    DRD
  </div>
);

export default Logo;
