import React, { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/slices/filterSlice';
import debounce from 'lodash.debounce';

import styles from './search.module.scss';

const Search: React.FC = memo(() => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const updateSearchValue = useCallback(
    debounce((string) => {
      dispatch(setSearch(string));
    }, 200),
    [],
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClear = () => {
    setInput('');
    dispatch(setSearch(''));
  };

  return (
    <label className={styles.root}>
      <img className="magnifier" src="/img/search.svg" alt="search" />
      <input value={input} onChange={onChange} type="text" />
      {input && <img onClick={onClear} className={styles.clear} src="/img/clear.svg" alt="clear" />}
    </label>
  );
});

export default Search;
