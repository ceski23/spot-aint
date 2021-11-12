import s from './Slider.module.scss';
import propTypes from 'prop-types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export const Slider = ({
  className, value, min, max, onValueChange
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isChanging, setIsChanging] = useState(false);

  const handleChange = (event) => {
    const val = event.currentTarget.value;
    setInternalValue(val);
  }

  const handlePointerUp = (event) => {
    const val = event.currentTarget.value;
    onValueChange(val);
    setIsChanging(false);
  }

  const handlePointerDown = () => {
    setIsChanging(true);
  }

  useEffect(() => {
    if (internalValue !== value && !isChanging) setInternalValue(value);
  }, [value]);

  return (
    <input
      type="range"
      min={min}
      max={max}
      className={clsx(s.slider, className)}
      value={internalValue}
      onChange={handleChange}
      onPointerUp={handlePointerUp}
      onPointerDown={handlePointerDown}
    />
  );
}

Slider.propTypes = {
  className: propTypes.string,
  value: propTypes.number.isRequired,
  min: propTypes.number,
  max: propTypes.number,
  onValueChange: propTypes.func.isRequired
}