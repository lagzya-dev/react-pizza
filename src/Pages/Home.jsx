import React from 'react';
import Sort from '../Components/Sort';
import Pizza from '../Components/Pizza';
import Skeleton from '../Components/Pizza/Skeleton';
import Categories from '../Components/Categories';
import axios from 'axios';
import Pagination from '../Components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
function Home() {
  const activeCategory = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  //const [activeCategory, setActiveCategory] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const selectSort = useSelector((state) => state.filter.sort);
  const searchValue = useSelector((state) => state.filter.searchValue);
  React.useEffect(() => {
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
    fetchData();
    window.scrollTo(0, 0);
  }, [activeCategory, selectSort, currentPage]);
  const setActiveCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <Sort />
      </div>
      <h2 className='content__title'>
        Все пиццы {searchValue === '' ? '' : `содержащие "${searchValue}"`}
      </h2>
      <div className='content__items'>
        {isLoading
          ? [...Array(10)].map((p, i) => <Skeleton key={i} />)
          : items
              .filter((p) => p.title.toLowerCase().includes(searchValue.toLowerCase()))
              .map((p) => (
                <Pizza
                  key={p.id}
                  {...p}
                />
              ))}
      </div>

      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}

export default Home;
