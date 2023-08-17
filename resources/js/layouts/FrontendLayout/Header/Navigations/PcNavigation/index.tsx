import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import githubIcon from "@iconify/icons-mdi/github";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Category } from "@/types/models";
import Link from "@/layouts/FrontendLayout/Header/Link";
import styles from "./styles.module.pcss";

const PcNavigation: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(route("categories.index"));
      setCategories(response.data.data);
    })();
  }, []);

  return (
    <NavigationMenu className="tw-hidden md:tw-flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="tw-text-xl">
            <Link href={route("articles.index")}>文章</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className={styles.categories}>
              {categories.map((category) => (
                <li key={category.id} className="tw-inline-flex tw-pl-2">
                  {category.title}
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <div className={cn(navigationMenuTriggerStyle(), "tw-text-xl")}>
              关于
            </div>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a
              href="https://github.com/dairidong"
              className={cn(navigationMenuTriggerStyle(), "tw-text-xl")}
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
