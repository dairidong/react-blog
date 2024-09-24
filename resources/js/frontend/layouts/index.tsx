import { FC, PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Head, usePage } from "@inertiajs/react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { appDescription = "", appKeywords = "" } = usePage<{
    appDescription?: string;
    appKeywords?: string;
  }>().props;

  return (
    <>
      <Head>
        <meta name="description" content={appDescription} />
        <meta name="keywords" content={appKeywords} />
      </Head>
      <div className="tw-flex tw-min-h-screen tw-flex-col tw-bg-background tw-font-junjun tw-text-foreground tw-antialiased">
        <Header />
        <main className="tw-flex-1">{children}</main>
        <Footer />,
      </div>
    </>
  );
};

export default Layout;
