import React from 'react';

interface IProps {
  optimizedFetch: (...args: any[]) => void;
}

export default function Input({ optimizedFetch }: IProps) {
  return (
    <input
      type='search'
      id='search'
      onChange={optimizedFetch}
      placeholder='Search...'
    />
  );
}
