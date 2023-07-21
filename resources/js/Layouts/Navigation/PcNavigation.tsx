import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem, NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger, navigationMenuTriggerStyle,
} from '@/Components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Category } from '@/types/models';

const PcNavigation: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(route('categories.index'));
      setCategories(response.data.data);
    })();
  }, []);

  return (
    <NavigationMenu className="font-ali hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xl">文章</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col gap-3 p-5 border border-black min-w-[10rem]">
              {categories.map((category) => (
                <li key={category.id} className="inline-flex pl-2">
                  {category.title}
                </li>
              ))}
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
};

export default PcNavigation;
