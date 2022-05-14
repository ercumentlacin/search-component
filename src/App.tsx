import { lazy, Suspense } from 'react';
const Search = lazy(() => import('./components/Search'));
const Container = lazy(() => import('./components/Container'));
const Loading = lazy(() => import('./components/Loading'));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Container>
        <Search />
      </Container>
    </Suspense>
  );
}
