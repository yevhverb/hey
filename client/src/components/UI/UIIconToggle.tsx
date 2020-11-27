import React from 'react';
import cx from 'classnames';

type Props = Partial<{
  state: boolean;
  onClass: string;
  offClass: string;
}>;

export const UIIconToggle: React.FC<Props> = ({
  state,
  onClass = '',
  offClass = '',
}) => {
  return <i className={cx({ [onClass]: state, [offClass]: !state })} />;
};
