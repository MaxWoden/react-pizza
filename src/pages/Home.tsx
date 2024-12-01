import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setFilters, selectFilter } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizza } from '../redux/slices/pizzaSlice';
import { PizzaType } from '../@types';

import { Sort, Categories, PizzaBlock, Skeleton } from '../components';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector(selectPizza);
  const { search, activeCategory, activeSortType } = useSelector(selectFilter);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  //Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        activeCategory,
        activeSortType,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeSortType, activeCategory]);

  //Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters({ ...params }));
      isSearch.current = true;
    }
  }, []);

  //Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scroll(0, 0);

    const searchProperty = search ? '&title_like=' + search : '';
    const categoryProperty = '&categories_like=' + activeCategory;
    const sortProperty = '&_sort=' + activeSortType.replace('-', '');
    const orderProperty = activeSortType.includes('-') ? '&_order=asc' : '&_order=desc';
    const query = searchProperty + categoryProperty + sortProperty + orderProperty;

    if (!isSearch.current) dispatch(fetchPizzas(query));
    isSearch.current = false;
  }, [activeSortType, activeCategory, search]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories activeCategory={activeCategory} />
          <Sort activeSortType={activeSortType} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {status === 'loading'
            ? [...Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((pizza: PizzaType, index) => <PizzaBlock key={index} {...pizza} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
