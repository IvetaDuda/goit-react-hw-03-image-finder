import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onLoadMoreButtonClick }) => {
  return (
    <div className={css.containerBtn}>
      <button
        className={css.Button}
        type="button"
        onClick={onLoadMoreButtonClick}
      >
        loade More
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMoreButtonClick: PropTypes.func.isRequired,
};

export default Button;
