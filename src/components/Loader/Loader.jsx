import { TailSpin } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.containerLoader}>
      <TailSpin color="#f27b77" height={50} width={50} />
      <p className={css.item}>Завантаження...</p>
    </div>
  );
};

export default Loader;
