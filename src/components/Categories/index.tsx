import React, { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../redux/slices/filterSlice';

import styles from './categories.module.scss';

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые'];

type Props = {
  activeCategory: number;
};

const Categories: React.FC<Props> = memo((props: Props) => {
  const dispatch = useDispatch();
  const handleChangeCategory = useCallback((index: number) => {
    dispatch(setCategory(index));
  }, []);
  const { activeCategory } = props;

  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={activeCategory === index ? styles.active : ''}
            onClick={() => handleChangeCategory(index)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
