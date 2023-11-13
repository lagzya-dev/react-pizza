import React from 'react';

function Categories() {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const onClickSelect = (index) => {
    setActiveCategory(index);
  };

  return (
    <div className='categories'>
      <ul className='flex-wrap'>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => onClickSelect(index)}
            className={`mb-15 ${activeCategory === index ? 'active' : ''}`}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
