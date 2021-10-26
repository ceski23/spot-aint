import clsx from 'clsx';
import s from './Button.module.scss';
import propTypes from 'prop-types';

export const Button = ({ children, className, onClick }) => (
  <button className={clsx(className, s.button)} onClick={onClick}>
    {children}
  </button>
)

Button.propTypes = {
  className: propTypes.string,
  onClick: propTypes.func
}