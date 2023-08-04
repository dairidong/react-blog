import { FC, PropsWithChildren, useRef } from "react";
import { createPortal } from "react-dom";
import Header from "@/Layouts/Header";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const layoutRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={layoutRef}>
      <header>
        {layoutRef.current !== null &&
          createPortal(<Header />, layoutRef.current.querySelector("header")!)}
      </header>
      <main>{children}</main>
      <footer />
    </div>
  );
};

export default Layout;
