import { ReactComponent as SearchSvg } from '../../assets/svg/loading.svg';
import './loading.scss';

type Props = {
  variant?: 'default' | 'small';
};

export default function Loading({ variant = 'default' }: Props) {
  return (
    <div className={`loading loading--${variant}`}>
      <SearchSvg
        className='loading__icon'
        aria-labelledby='loading-icon'
        role='img'
        aria-label='loading'
      />
    </div>
  );
}
