import { FC, PropsWithChildren } from 'react';
import Header from '@/Layouts/Header';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <header>
      <Header />
    </header>
    <main>{children}</main>
    <footer />
  </>
);

export default Layout;
