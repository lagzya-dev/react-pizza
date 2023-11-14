import React from 'react';
import Sort, { sorts } from '../Components/Sort';
import Pizza from '../Components/Pizza';
import Skeleton from '../Components/Pizza/Skeleton';
import Categories from '../Components/Categories';
import axios from 'axios';
import Pagination from '../Components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

function Home() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const activeCategory = useSelector((state) => state.filter.categoryId);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  //const [activeCategory, setActiveCategory] = React.useState(0);
  const selectSort = useSelector((state) => state.filter.sort);
  const searchValue = useSelector((state) => state.filter.searchValue);

  async function fetchData() {
    try {
      setIsLoading(true);
      const responce = await axios.get(
        `https://6551fa295c69a77903295da1.mockapi.io/api/pizzas?page=${currentPage}&limit=4&${
          activeCategory === 0
            ? `sortBy=${selectSort.sortProperty}&order=desc`
            : `category=${activeCategory}&sortBy=${selectSort.sortProperty}&order=desc`
        }`,
      );
      setItems(responce.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert('Ошибка загрузки базы');
    }
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sorts.find((sort) => sort.sortProperty === params.sortBy);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchData();
    }
    isSearch.current = false;
  }, [activeCategory, selectSort, currentPage]);
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: selectSort.sortProperty,
        activeCategory,
        currentPage,
      });

      navigation(`/?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategory, selectSort, currentPage]);
  const setActiveCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">
        Все пиццы {searchValue === '' ? '' : `содержащие "${searchValue}"`}
      </h2>
      <div className="content__items">
        {isLoading
          ? [...Array(10)].map((p, i) => <Skeleton key={i} />)
          : items
              .filter((p) =>
                p.title.toLowerCase().includes(searchValue.toLowerCase()),
              )
              .map((p) => <Pizza key={p.id} {...p} />)}
      </div>

      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
}

export default Home;
