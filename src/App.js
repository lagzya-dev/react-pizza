import React from 'react';
import './scss/app.scss';
import Header from './Components/Header';
import Categories from './Components/Categories';
import Sort from './Components/Sort';
import Pizza from './Components/Pizza';
import axios from 'axios';
function App() {
  const [pizzas, setPizzas] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      const responce = await axios.get('https://6551fa295c69a77903295da1.mockapi.io/api/pizzas');
      setPizzas(responce.data);
      console.log(123);
    }
    fetchData();
  }, []);
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {pizzas.map((p) => (
              <Pizza
                key={p.id}
                {...p}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
