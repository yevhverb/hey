import React from 'react';
import cx from 'classnames';
import { UILogo, UIButton, UILoader } from '../../../components/UI';

type Props = {
  icon?: string;
  loader?: boolean;
  toStart?: () => void;
};

export const RoomMessage: React.FC<Props> = ({
  icon = '',
  loader = false,
  toStart,
  children,
}) => {
  return (
    <div className="lg:w-5/12 md:w-7/12 sm:w-2/3 w-full space-y-9">
      <div className="space-y-4">
        {icon && !loader && (
          <UILogo className="w-24 h-24 mx-auto text-4.5xl" icon={icon} />
        )}
        {loader && (
          <UILoader className="w-20 h-20" classNameItem="bg-gray-700" />
        )}
        <h3
          className={cx(
            'font-bold  text-center',
            loader ? 'text-3xl text-gray-700' : 'text-4xl'
          )}
        >
          {children}
        </h3>
      </div>
      {toStart && (
        <UIButton
          className="mx-auto border-gray-900 ring-gray-700 bg-gray-800"
          classIcon="fas fa-arrow-left"
          onClick={toStart}
        >
          Leave
        </UIButton>
      )}
    </div>
  );
};
