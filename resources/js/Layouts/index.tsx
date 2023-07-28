import { FC, PropsWithChildren } from 'react';
import Header from '@/Layouts/Header';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className="text-primary bg-background">
    <header>
      <Header />
    </header>
    <main>{children}</main>
    <footer />
  </div>
);

export default Layout;
