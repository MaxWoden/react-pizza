import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './pizza-block.module.scss';

import { addItem } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';
import { PizzaType } from '../../@types';

const typeNames = ['тонкое', 'традиционное'];

const PizzaBlock: React.FC<PizzaType> = ({ title, price, imgUrl, types, sizes, id }) => {
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [pizzaPrice, setPizzaPrice] = useState(price);

  const dispatch = useDispatch();
  const { items, length } = useSelector((state: RootState) => state.persistedReducerCart);
  const findItem = items.find(
    (item: any) => item.title === title && item.size === activeSize && item.type === activeType,
  );

  useEffect(() => {
    switch (activeSize) {
      case 26:
        setPizzaPrice(price);
        break;
      case 30:
        setPizzaPrice(price + 80);
        break;
      case 40:
        setPizzaPrice(price + 250);
        break;
      default:
        break;
    }
  }, [activeSize]);

  const handleAddItem = () => {
    dispatch(
      addItem({
        title,
        price: pizzaPrice,
        imgUrl,
        size: activeSize,
        type: activeType,
        count: 1,
        id: length,
      }),
    );
  };

  return (
    <div className="pizza-block-wrapper">
      <div className={styles.root}>
        <Link to={`/pizza/${id}`}>
          <img className={styles.pizzaImg} src={imgUrl} alt="Pizza" />
          <h4 className={styles.title}>{title}</h4>
        </Link>
        <div className={styles.selector}>
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                className={activeType === typeId ? styles.active : ''}
                onClick={() => setActiveType(typeId)}>
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                className={activeSize === size ? styles.active : ''}
                onClick={() => setActiveSize(size)}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.bottom}>
          <div className={styles.price}>{pizzaPrice} ₽</div>
          <button onClick={handleAddItem} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {findItem && <i>{findItem.count}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
