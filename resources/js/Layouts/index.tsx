import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <div>header</div>
    {children}
  </>
);

export default Layout;
