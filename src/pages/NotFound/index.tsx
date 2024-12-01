import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>🫤</span>
        <br />
        Ничего не найдено
      </h1>
      <p>К сожаление данная страница отсутствует в магазине</p>
    </div>
  );
};

export default NotFound;
