import { ChangeEvent, useCallback, useState, lazy } from 'react';
import useFetch from '../../hooks/useFetch';
import { Result } from '../../types';
import { debounce } from '../../utils';

import { ReactComponent as SearchSvg } from '../../assets/svg/search.svg';

import './search.scss';
import Loading from '../Loading';

const Cell = lazy(() => import('../Cell'));

export default function Search() {
  const [params, setParams] = useState<{
    query?: string;
  }>({});

  const { data, error, loading } = useFetch(params);

  const onChangeQuery = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setParams({ query: value });
  }, 500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedFetch = useCallback(onChangeQuery, []);

  return (
    <div className='search'>
      <div className='search__area'>
        <label htmlFor='search'>
          <SearchSvg className='search__icon' />
        </label>
        <input
          type='search'
          id='search'
          onChange={optimizedFetch}
          placeholder='Search...'
        />
      </div>
      {loading && <Loading />}
      {data &&
        data.map((result: Result) => <Cell {...result} key={result.id} />)}
      {error && <div className='search__error'>{JSON.stringify(error)}</div>}
    </div>
  );
}
