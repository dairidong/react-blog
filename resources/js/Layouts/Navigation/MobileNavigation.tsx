import { Icon } from '@iconify/react';
import githubIcon from '@iconify/icons-mdi/github';
import React, {
  ButtonHTMLAttributes,
  createContext, FC, forwardRef, MouseEvent, ProviderProps, useContext,
} from 'react';
import { cn } from '@/lib/utils';
import styles from '@/Layouts/styles.module.css';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList, navigationMenuTriggerStyle,
} from '@/Components/ui/navigation-menu';

export interface MenuControlState {
  menuOpen: boolean,
  triggerMenu: (withAnimation: boolean) => void
}

export const MobileNavControlContext = createContext<MenuControlState>({
  menuOpen: false,
  triggerMenu: () => {
  },
});

export const MobileNavControlProvider: FC<ProviderProps<MenuControlState>> =
  ({ value, children }, context) => (
    <MobileNavControlContext.Provider value={value}>
      {children}
    </MobileNavControlContext.Provider>
  );

export const MobileNavTrigger: FC<ButtonHTMLAttributes<HTMLButtonElement>> =
  ({ className, ...props }) => {
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

const MobileNavigation = forwardRef<HTMLDivElement>((props, ref) => {
  const { menuOpen, triggerMenu } = useContext(MobileNavControlContext);
  return (
    <div
      className={cn(
        styles.mobileNavContainer,
      )}
      ref={ref}
      aria-hidden={!menuOpen}
      aria-labelledby="mobile-nav-trigger"
      id="mobile-nav"
    >
      {menuOpen && (
        <NavigationMenu className={styles.mobileNav}>
          <NavigationMenuList className="flex-col gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <div className={cn(navigationMenuTriggerStyle(), 'text-3xl')}>文章</div>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <div className={cn(navigationMenuTriggerStyle(), 'text-3xl')}>关于</div>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a
                  href="https://github.com/dairidong"
                  className={cn(navigationMenuTriggerStyle(), 'text-3xl gap-2')}
                >
                  <Icon icon={githubIcon} className="text-5xl" />
                  Github
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </div>
  );
});

export default MobileNavigation;