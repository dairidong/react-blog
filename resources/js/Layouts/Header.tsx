import React from 'react';
import { Link } from '@inertiajs/react';
import styles from './styles.module.css';
import Navigation from './Navigation';

const Header = () => (
  <div className={styles.header}>
    {/* Logo */}
    <div>
      <Link href={route('home')} className={styles.logo}>
        DRD
      </Link>
    </div>

    <Navigation />
  </div>
);

export default Header;
