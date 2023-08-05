import { FC, PropsWithChildren, useRef } from "react";
import { createPortal } from "react-dom";
import Header from "@/Layouts/Header";
import Footer from "@/Layouts/Footer";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  // layoutRef，确认客户端渲染再加载 layout 内容
  const layoutRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={layoutRef}>
      <header>
        {layoutRef.current !== null &&
          createPortal(<Header />, layoutRef.current.querySelector("header")!)}
      </header>
      <main>{children}</main>
      <footer>
        {layoutRef.current !== null &&
          createPortal(<Footer />, layoutRef.current.querySelector("footer")!)}
      </footer>
    </div>
  );
};

export default Layout;
