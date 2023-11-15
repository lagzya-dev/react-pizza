import React from 'react';
import SortComponent, { sorts } from '../Components/Sort';
import Pizza from '../Components/Pizza';
import Skeleton from '../Components/Pizza/Skeleton';
import Categories from '../Components/Categories';
import Pagination from '../Components/Pagination';
import { useSelector } from 'react-redux';
import {
  selectFilters,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import {
  fetchPizzas,
  PizzaItem,
  selectPizza,
  Status,
} from '../redux/slices/pizzaSlice';
import Error from './Error';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(selectPizza);
  const { categoryId, currentPage, sort, searchValue } =
    useSelector(selectFilters);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (window.location.search) {
      const { categoryId, sortBy, currentPage } = qs.parse(
        window.location.search.substring(1),
      );
      const sort = sorts.find((sort) => sort.sortProperty === sortBy);
      dispatch(
        setFilters({
          categoryId: Number(categoryId),
          currentPage: Number(currentPage),
          sort,
          searchValue,
        }),
      );
      isSearch.current = true;
    }
  }, []);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      // @ts-ignore
      dispatch(fetchPizzas({ currentPage, categoryId, sort }));
    }
    isSearch.current = false;
  }, [categoryId, sort, currentPage]);
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sort?.sortProperty,
        categoryId,
        currentPage,
      });

      navigation(`/?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage]);
  const setActiveCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };
  if (status === Status.ERROR) {
    return <Error />;
  }
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={categoryId}
          setActiveCategory={setActiveCategory}
        />
        <SortComponent />
      </div>
      <h2 className="content__title">
        Все пиццы {searchValue === '' ? '' : `содержащие "${searchValue}"`}
      </h2>
      <div className="content__items">
        {status === Status.LOADING
          ? [...Array(10)].map((p, i) => <Skeleton key={i} />)
          : items
              .filter((p: PizzaItem) =>
                p.title.toLowerCase().includes(searchValue.toLowerCase()),
              )
              .map((p: PizzaItem) => <Pizza key={p.id} {...p} />)}
      </div>

      <Pagination
        currentPage={currentPage}
        onChangePage={(number: number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
};

export default Home;
