import { lazy, Suspense } from 'react';
const Search = lazy(() => import('./components/Search'));
const Container = lazy(() => import('./components/Container'));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <Search />
      </Container>
    </Suspense>
  );
}
