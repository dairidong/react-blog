import React, { FC } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem, NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger, navigationMenuTriggerStyle,
} from '@/Components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Category } from '@/types/models';

const Navigation: FC<{ categories: Category[] }> = ({ categories }) => (
  <NavigationMenu className="font-ali hidden md:flex">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger className="text-xl">分类</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="flex flex-col items-center gap-3 p-5 border border-black">
            {categories.map((category) => <li key={category.id}>{category.title}</li>)}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <div className={cn(navigationMenuTriggerStyle(), 'text-xl')}>关于</div>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

export default Navigation;
