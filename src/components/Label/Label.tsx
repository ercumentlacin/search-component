import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export default function Label({ children }: IProps) {
  return <label htmlFor='search'>{children}</label>;
}
