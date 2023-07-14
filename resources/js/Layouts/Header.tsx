import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import styles from './styles.module.css';
import Navigation from './Navigation';
import { Category } from '@/types/models';

const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(route('categories.index'));
      setCategories(response.data.data);
    })();
  }, []);

  return (
    <div className={styles.header}>
      {/* Logo */}
      <div>
        <Link href={route('home')} className={styles.logo}>
          DRD
        </Link>
      </div>

      <Navigation categories={categories} />
    </div>
  );
};

export default Header;
