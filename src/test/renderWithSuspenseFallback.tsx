import { render } from '@testing-library/react';
import { lazy, Suspense } from 'react';

const Loading = lazy(() => import('../components/Loading'));

export function renderWithSuspenseFallback(ui: React.ReactElement) {
  return render(<Suspense fallback={<Loading />}>{ui}</Suspense>);
}
