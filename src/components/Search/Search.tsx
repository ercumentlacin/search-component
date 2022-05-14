import { ChangeEvent, useCallback, useState, lazy } from 'react';
import useFetch from '../../hooks/useFetch';
import { Result } from '../../types';
import { debounce } from '../../utils';

import { ReactComponent as SearchSvg } from '../../assets/svg/search.svg';

import './search.scss';

const Loading = lazy(() => import('../Loading'));
const Cell = lazy(() => import('../Cell'));
const Input = lazy(() => import('../Input'));
const Label = lazy(() => import('../Label'));

export default function Search() {
  const [params, setParams] = useState<{
    query?: string;
  }>({});

  const { data, error, loading } = useFetch(params);

  const onChangeQuery = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setParams({ query: value });
  }, 500);

  const optimizedFetch = useCallback(onChangeQuery, [onChangeQuery]);

  return (
    <div className='search'>
      <div className='search__area'>
        <Label>
          <SearchSvg className='search__icon' />
        </Label>
        <Input optimizedFetch={optimizedFetch} />
      </div>

      {loading && <Loading />}

      {data &&
        data.map((result: Result) => <Cell {...result} key={result.id} />)}
      {error && <div className='search__error'>{JSON.stringify(error)}</div>}
    </div>
  );
}
