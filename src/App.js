import React from 'react';
import './scss/app.scss';
import Header from './Components/Header';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className='wrapper'>
      <Header />

      <div className='content'>
        <div className='container'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/cart'
              element={<Cart />}
            />
            <Route
              path='*'
              element={<NotFound />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
