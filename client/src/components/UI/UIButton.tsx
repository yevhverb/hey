import React from 'react';
import cx from 'classnames';

type Props = {
  type?: 'button' | 'submit';
  className?: string;
  classIcon?: string;
  onClick?: () => void;
};

export const UIButton: React.FC<Props> = ({
  type = 'button',
  className = '',
  classIcon = '',
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      className={cx(
        className,
        'flex items-center justify-center px-5 py-2 border-3 rounded-xl font-extrabold uppercase space-x-4 transition duration-100 ring-0 focus:ring-3 focus:outline-none hover:opacity-90'
      )}
      onClick={onClick || (() => {})}
    >
      {classIcon && <i className={cx(classIcon, 'text-sm')} />}
      <span>{children}</span>
    </button>
  );
};
