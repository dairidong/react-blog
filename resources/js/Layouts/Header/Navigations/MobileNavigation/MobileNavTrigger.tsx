import React, { ButtonHTMLAttributes, FC, MouseEvent, useContext } from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.pcss";
import MobileNavControlContext from "./MobileNavControlContext";

const MobileNavTrigger: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const { menuOpen, triggerMenu } = useContext(MobileNavControlContext);

  const handleTrigger = (e: MouseEvent) => {
    e.preventDefault();
    triggerMenu(true);
  };

  return (
    <button
      aria-expanded={menuOpen}
      onClick={handleTrigger}
      type="button"
      className={cn(styles.mobileNavTrigger, className)}
      {...props}
    >
      <div className={styles.line} />
      <div className={styles.line} />
      <div className={styles.line} />
    </button>
  );
};

export default MobileNavTrigger;
