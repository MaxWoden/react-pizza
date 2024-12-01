import { Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';

import './scss/app.scss';

import Home from './pages/Home';
import { MainLayout } from './layouts/MainLayout';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "FullPizza" */ './components/FullPizza'),
);
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Идёт загрузка страницы...</div>}>
              <NotFound />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<div>Идёт загрузка пиццы...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
