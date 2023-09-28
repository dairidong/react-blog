import { FC, PropsWithChildren, useRef } from "react";
import { createPortal } from "react-dom";
import { usePage } from "@inertiajs/react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./styles.module.pcss";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  // layoutRef，确认客户端渲染再加载 layout 内容
  const layoutRef = useRef<HTMLDivElement>(null);

  const { icp } = usePage<{
    icp: {
      icp_no: string | null;
      police_icp_no: string | null;
      police_icp_url: string | null;
    };
  }>().props;

  return (
    <div ref={layoutRef} className={styles.layout}>
      <header>
        {layoutRef.current !== null &&
          createPortal(<Header />, layoutRef.current.querySelector("header")!)}
      </header>
      <main className="tw-flex-1">{children}</main>
      <footer className="tw-justify-self-end">
        {layoutRef.current !== null &&
          createPortal(
            <Footer icp={icp} />,
            layoutRef.current.querySelector("footer")!,
          )}
      </footer>
    </div>
  );
};

export default Layout;
