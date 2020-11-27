import React from 'react';
import cx from 'classnames';

type Props = {
  className?: string;
};

export const UIBar: React.FC<Props> = ({ className = '', children }) => {
  return (
    <div
      className={cx(
        className,
        'sticky z-10 left-0 flex items-center w-full px-3 py-4 bg-gray-900 bg-opacity-90'
      )}
    >
      {children}
    </div>
  );
};
