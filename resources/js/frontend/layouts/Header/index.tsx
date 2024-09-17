import React, { memo, useRef, useState } from "react";
import { useRoute } from "ziggy-js";
import styles from "./styles.module.pcss";
import mobileStyles from "./Navigations/MobileNavigation/styles.module.pcss";
import PcNavigation from "./Navigations/PcNavigation";

import Link from "./Link";
import { MobileNavControlProvider } from "./Navigations/MobileNavigation/MobileNavControlContext";
import MobileNavTrigger from "./Navigations/MobileNavigation/MobileNavTrigger";
import MobileNavigation from "./Navigations/MobileNavigation";
import Logo from "@/components/Logo";

// use memo to prevent repeated render
const Header = memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const route = useRoute();

  const triggerMenu = (withAnimation: boolean) => {
    menuRef.current?.classList.toggle(
      mobileStyles.withAnimation,
      withAnimation,
    );

    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className={styles.navbarContainer}>
        <MobileNavControlProvider
          value={{
            menuOpen,
            triggerMenu,
          }}
        >
          <div className={styles.navbar}>
            {/* Logo */}
            <div>
              <Link href={route("home")} closeMenu>
                <Logo />
              </Link>
            </div>

            <PcNavigation />
            <MobileNavTrigger
              id="mobile-nav-trigger"
              aria-controls="mobile-nav"
            />
          </div>
          <MobileNavigation ref={menuRef} />
        </MobileNavControlProvider>
      </div>
    </header>
  );
});

export default Header;
