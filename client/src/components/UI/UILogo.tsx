import React from 'react';
import cx from 'classnames';
import { getRandomEmoji } from '../../utils';

type Props = {
  icon?: string;
  className?: string;
};

export const UILogo: React.FC<Props> = React.memo(({ icon, className }) => {
  return (
    <div
      className={cx(
        className,
        'flex items-center justify-center rounded-full bg-gray-700 bg-opacity-50 select-none'
      )}
    >
      {icon || getRandomEmoji()}
    </div>
  );
});
