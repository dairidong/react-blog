import { Icon } from "@iconify/react";
import githubIcon from "@iconify/icons-mdi/github";
import React, { forwardRef, useContext } from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.pcss";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu";
import Link from "@/Layouts/Header/Link";
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
        <NavigationMenu className={styles.mobileNav}>
          <NavigationMenuList className="tw-flex-col tw-gap-6">
            <NavigationMenuItem>
              <Link href={route("articles.index")} closeMenu>
                <NavigationMenuLink asChild>
                  <div
                    className={cn(navigationMenuTriggerStyle(), "tw-text-3xl")}
                  >
                    文章
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <div
                  className={cn(navigationMenuTriggerStyle(), "tw-text-3xl")}
                >
                  关于
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a
                  href="https://github.com/dairidong"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "tw-gap-1 tw-text-3xl",
                  )}
                >
                  <Icon icon={githubIcon} className="tw-text-5xl" />
                  Github
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
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
