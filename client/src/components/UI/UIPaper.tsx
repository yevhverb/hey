import React from 'react';
import cx from 'classnames';

type Props = {
  className?: string;
};

export const UIPaper: React.FC<Props> = ({ className = '', children }) => {
  return (
    <div className={cx(className, 'rounded-2xl bg-gray-800')}>{children}</div>
  );
};
