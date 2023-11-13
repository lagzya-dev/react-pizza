import React from 'react';

function Categories() {
  return (
    <div className='categories'>
      <ul className='flex-wrap'>
        <li className='active mb-15'>Все</li>
        <li className='mb-15'>Мясные</li>
        <li className='mb-15'>Вегетарианская</li>
        <li className='mb-15'>Гриль</li>
        <li className='mb-15'>Острые</li>
        <li className='mb-15'>Закрытые</li>
      </ul>
    </div>
  );
}

export default Categories;
