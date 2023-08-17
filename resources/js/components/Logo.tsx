import React, { FC, HTMLAttributes } from "react";
import styles from "@/layouts/FrontendLayout/Header/styles.module.pcss";
import { cn } from "@/lib/utils";

const Logo: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn(styles.logo, className)} {...props}>
    DRD
  </div>
);

export default Logo;
