import React from 'react';
import Sort from '../Components/Sort';
import Pizza from '../Components/Pizza';
import Skeleton from '../Components/Pizza/Skeleton';
import Categories from '../Components/Categories';
import axios from 'axios';

function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    async function fetchData() {
      const responce = await axios.get('https://6551fa295c69a77903295da1.mockapi.io/api/pizzas');
      setItems(responce.data);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...Array(10)].map((p, i) => <Skeleton key={i} />)
          : items.map((p) => (
              <Pizza
                key={p.id}
                {...p}
              />
            ))}
      </div>
    </>
  );
}

export default Home;
