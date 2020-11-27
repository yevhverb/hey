import React from 'react';
import cx from 'classnames';

type Props = {
  className?: string;
};

export const RoomUserItem: React.FC<Props> = ({ className = '', children }) => (
  <div
    className={cx(
      className,
      'flex items-center justify-center min-w-10 h-7 rounded-md bg-gray-900'
    )}
  >
    {children}
  </div>
);
