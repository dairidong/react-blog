import { FC, PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="tw-flex tw-min-h-screen tw-flex-col tw-bg-background tw-font-junjun tw-text-foreground tw-antialiased">
      <Header />
      <main className="tw-flex-1">{children}</main>
      <Footer />,
    </div>
  );
};

export default Layout;
