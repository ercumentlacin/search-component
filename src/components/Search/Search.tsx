import React from 'react';
import useFetch from '../../hooks/useFetch';
import { Result } from '../../types';
import { debounce } from '../../utils';

export default function Search() {
  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState<Result[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { data, error, loading } = useFetch({
    query: search,
  });

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    // setSearch(e.target.value);
    debounce(() => {
      setSearch(e.target.value);
    }, 500);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('search', search);
  }

  React.useEffect(() => {
    if (data) {
      setResults(data);
    }
  }, [data]);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const searchResults = React.useMemo(() => {
    if (search.length === 0) return [];

    return results.filter((result) => {
      return result.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, results]);

  return (
    <div className='search'>
      <label htmlFor='search'>Search</label>
      <input
        type='text'
        placeholder='Search'
        id='search'
        ref={inputRef}
        onChange={handleSearch}
        value={search}
      />

      <ul className='search__results'>
        {searchResults.map((result) => (
          <li key={result.id}>
            <h2>{result.name}</h2>
            <p>{result.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
