import { FC } from 'react';
import { Page } from '@/types';

const Layout: FC<{ page: Page }> = ({ page }) => (
  <>
    <div>header</div>
    {page}
  </>
);

export default Layout;
