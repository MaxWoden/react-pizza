import React, { useState, useRef, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';

import styles from './sort.module.scss';

import { setSortType } from '../../redux/slices/filterSlice';

type Sort = {
  name: string;
  sortType: 'rating' | 'price' | '-price';
};

const sortList: Sort[] = [
  { name: 'Сначала популярные', sortType: 'rating' },
  { name: 'Сначала недорогие', sortType: '-price' },
  { name: 'Сначала дорогие', sortType: 'price' },
];

type Props = {
  activeSortType: string;
};

const Sort: React.FC<Props> = memo((props: Props) => {
  const [open, setOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const { activeSortType } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className={styles.root}>
      <div onClick={() => setOpen(!open)} className={styles.label}>
        <span>
          {sortList.map((item) => {
            return item.sortType === activeSortType ? item.name : '';
          })}
        </span>
        <b>↓↑</b>
      </div>
      {open && (
        <div className={styles.popup}>
          <ul>
            {sortList.map((item, index) => (
              <li
                key={index}
                className={activeSortType === item.sortType ? styles.active : ''}
                onClick={() => {
                  dispatch(setSortType(item.sortType));
                  setOpen(!open);
                }}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
