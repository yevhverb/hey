import React from 'react';
import cx from 'classnames';

type Props = {
  className?: string;
  onClick?: () => void;
};

export const RoomUserAction: React.FC<Props> = ({
  className = '',
  onClick,
  children,
}) => (
  <button
    className={cx(
      className,
      'flex items-center justify-center w-11 h-7 py-3 border-3 border-gray-900 rounded-md text-sm bg-gray-800 focus:ring-3 ring-gray-700 focus:outline-none'
    )}
    onClick={onClick}
  >
    {children}
  </button>
);
