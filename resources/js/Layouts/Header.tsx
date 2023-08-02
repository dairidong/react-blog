import React, { useRef, useState } from "react";
import styles from "./styles.module.pcss";
import PcNavigation from "@/Layouts/Navigation/PcNavigation";

import Link from "@/Layouts/Link";
import MobileNavigation, {
  MobileNavControlProvider,
  MobileNavTrigger,
} from "@/Layouts/Navigation/MobileNavigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const triggerMenu = (withAnimation: boolean) => {
    menuRef.current?.classList.toggle(styles.withAnimation, withAnimation);
    setMenuOpen(!menuOpen);
  };

  return (
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
            <Link href={route("home")} className={styles.logo} closeMenu>
              DRD
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
  );
};

export default Header;
