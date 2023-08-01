import { FC, PropsWithChildren } from 'react';
import Header from '@/Layouts/Header';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className="tw-text-foreground tw-bg-background tw-font-ali-shuhei tw-antialiased">
    <header>
      <Header />
    </header>
    <main>{children}</main>
    <footer />
  </div>
);

export default Layout;
