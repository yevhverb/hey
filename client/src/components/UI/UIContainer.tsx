import React from 'react';
import cx from 'classnames';

type Props = {
  className?: string;
};

export const UIContainer: React.FC<Props> = ({ className = '', children }) => {
  return (
    <div className={cx(className, 'container mx-auto px-5')}>{children}</div>
  );
};
