import React from 'react';
import cx from 'classnames';

type Props = {
  name: string;
  type?: 'text' | 'number';
  initialState?: string | number;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  register?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const UIInput = ({
  name,
  type = 'text',
  initialState = '',
  placeholder = '',
  className = '',
  autoFocus = false,
  register,
  onChange,
}: Props) => {
  const [value, setValue] = React.useState(initialState);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange && onChange(e);
  };

  return (
    <input
      type={type}
      name={name}
      value={value}
      ref={register}
      autoFocus={autoFocus}
      placeholder={placeholder}
      className={cx(
        className,
        'px-5 py-2.5 border-3 border-transparent rounded-xl font-medium placeholder-gray-400 bg-transparent transition duration-100 ring-0 focus:ring-3 focus:outline-none hover:opacity-90'
      )}
      onChange={changeValue}
    />
  );
};
