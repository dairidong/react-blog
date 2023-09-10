import { Icon } from "@iconify/react";
import githubIcon from "@iconify/icons-mdi/github";
import React, { forwardRef, useContext } from "react";
import Link from "@frontend/layouts/Header/Link";
import { cn } from "@/lib/utils";
import styles from "./styles.module.pcss";
import MobileNavControlContext from "./MobileNavControlContext";

const MobileNavigation = forwardRef<HTMLDivElement>((props, ref) => {
  const { menuOpen, triggerMenu } = useContext(MobileNavControlContext);
  return (
    <>
      <div
        className={cn(styles.mobileNavContainer)}
        ref={ref}
        aria-hidden={!menuOpen}
        aria-labelledby="mobile-nav-trigger"
        id="mobile-nav"
      >
        <ul
          className={cn(
            styles.mobileNav,
            "tw-flex tw-flex-col tw-items-center tw-gap-6",
          )}
        >
          <li className="tw-text-4xl">
            <Link
              href={route("articles.index")}
              className="tw-flex tw-px-5 tw-py-2"
              closeMenu
            >
              文章
            </Link>
          </li>
          <li className="tw-text-4xl">
            {/* TODO 更换链接 */}
            <Link
              href={route("articles.index")}
              className="tw-flex tw-px-5 tw-py-2"
              closeMenu
            >
              关于
            </Link>
          </li>
          <li className="tw-text-4xl">
            <a
              href="https://github.com/dairidong"
              className="tw-flex tw-items-center tw-gap-1 tw-px-5 tw-py-2"
            >
              <Icon icon={githubIcon} className="tw-text-5xl" />
              Github
            </a>
          </li>
        </ul>
      </div>
      <div
        className={cn(
          "tw-fixed tw-z-[5] tw-min-h-full tw-w-screen md:tw-hidden",
          menuOpen ? "tw-block" : "tw-hidden",
        )}
        onClick={() => triggerMenu(true)}
        role="none"
      />
    </>
  );
});

export default MobileNavigation;
