import React from 'react';
import cx from 'classnames';
import './UILoader.css';

type Props = {
  className?: string;
  classNameItem?: string;
};

export const UILoader: React.FC<Props> = ({ className, classNameItem }) => {
  return (
    <div className={cx('loader-double-bounce', className)}>
      <div
        className={cx('loader-child loader-double-bounce-1', classNameItem)}
      />
      <div
        className={cx('loader-child loader-double-bounce-2', classNameItem)}
      />
    </div>
  );
};
