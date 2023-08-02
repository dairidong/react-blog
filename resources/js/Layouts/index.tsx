import { FC, PropsWithChildren } from "react";
import Header from "@/Layouts/Header";

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div>
    <header>
      <Header />
    </header>
    <main>{children}</main>
    <footer />
  </div>
);

export default Layout;
