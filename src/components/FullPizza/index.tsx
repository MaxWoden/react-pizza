import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styles from './full-pizza.module.scss';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<{
    imgUrl: string;
    title: string;
    price: number;
  }>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/items?id=${id}`);
        setItem(data[0]);
      } catch (error) {
        alert('Произошла ошибка при загрузке страницы, перемещаем вас на главную');
        console.log(error);
        navigate('/');
      }
    })();
  }, []);

  if (!item) return <>Загрузка...</>;

  return (
    <div className={styles.root}>
      <Link className={`${styles.button} button button--outline button--add go-back-btn`} to="/">
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 13L1 6.93015L6.86175 1"
            stroke="#D3D3D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Вернуться назад</span>
      </Link>
      <div className={styles.item}>
        <h1>{item.title}</h1>
        <img height={400} src={item.imgUrl} alt="Pizza" />
      </div>
    </div>
  );
};
export default FullPizza;
