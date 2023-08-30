import React, { FC } from "react";
import { Icon } from "@iconify/react";
import githubIcon from "@iconify/icons-mdi/github";
import { Link } from "@inertiajs/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const PcNavigation: FC = () => {
  return (
    <NavigationMenu className="tw-hidden md:tw-flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(navigationMenuTriggerStyle(), "tw-text-xl")}
            asChild
          >
            <Link href={route("articles.index")}>文章</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <div className={cn(navigationMenuTriggerStyle(), "tw-text-xl")}>
              关于
            </div>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(navigationMenuTriggerStyle(), "tw-text-xl")}
            asChild
          >
            <a
              href="https://github.com/dairidong"
              target="_blank"
              rel="noreferrer"
            >
              <Icon icon={githubIcon} className="tw-text-4xl" />
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default PcNavigation;
