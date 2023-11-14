import React from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
function Search() {
  const searchValue = useSelector((state) => state.filter.searchValue);
  const inputRef = React.useRef();
  const dispatch = useDispatch();
  const onClickClear = () => {
    dispatch(setSearchValue(''));
    inputRef.current.focus();
  };
  const sendDebounce = debounce((value) => {
    dispatch(setSearchValue(value));
  }, 1000);
  const onChangeInput = () => {
    sendDebounce(inputRef.current.value);
  };
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g
          id='SVGRepo_bgCarrier'
          strokeWidth='0'
        ></g>
        <g
          id='SVGRepo_tracerCarrier'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></g>
        <g id='SVGRepo_iconCarrier'>
          {' '}
          <path
            opacity='0.1'
            d='M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z'
            fill='#323232'
          ></path>{' '}
          <path
            d='M15 15L21 21'
            stroke='#323232'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>{' '}
          <path
            d='M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z'
            stroke='#323232'
            strokeWidth='2'
          ></path>{' '}
        </g>
      </svg>
      {searchValue && (
        <svg
          onClick={onClickClear}
          className={styles.icon2}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g
            id='SVGRepo_bgCarrier'
            strokeWidth='0'
          ></g>
          <g
            id='SVGRepo_tracerCarrier'
            strokewinecap='round'
            strokeLinejoin='round'
          ></g>
          <g id='SVGRepo_iconCarrier'>
            {' '}
            <path
              d='M8 8L16 16'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></path>{' '}
            <path
              d='M16 8L8 16'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></path>{' '}
          </g>
        </svg>
      )}
      <input
        name='search'
        ref={inputRef}
        className={styles.input}
        onChange={onChangeInput}
        value={inputRef.current.value}
        placeholder='Поиск пиццы...'
        type='text'
      />
    </div>
  );
}

export default Search;
