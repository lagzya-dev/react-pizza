import React from 'react';

type CategoriesProps = {
  activeCategory: number;
  setActiveCategory: (idx: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({
  activeCategory,
  setActiveCategory,
}) => {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const onClickSelect = (index: number) => {
    setActiveCategory(index);
  };

  return (
    <div className="categories">
      <ul className="flex-wrap">
        {categories.map((category, index) => (
          <li
            key={category}
            onClick={() => onClickSelect(index)}
            className={`mb-15 ${activeCategory === index ? 'active' : ''}`}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
