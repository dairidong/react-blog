import React, { FC } from "react";
import { Icon } from "@iconify/react";
import githubIcon from "@iconify/icons-mdi/github";
import { Link } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const PcNavigation: FC = () => {
  const route = useRoute();

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
          <NavigationMenuLink
            className={cn(navigationMenuTriggerStyle(), "tw-text-xl")}
            asChild
          >
            <Link href={route("about")}>关于</Link>
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
              <span aria-hidden="true" className="tw-hidden">
                github
              </span>
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default PcNavigation;
