import React from 'react';
import cx from 'classnames';
import { UserState } from '../../../store/user';
import { UIButton, UIBar } from '../../../components/UI';

type Props = {
  toggleMuteStream: () => void;
  userPermits: UserState['userPermits'];
  leaveRoom: () => void;
};

export const RoomBottomBar: React.FC<Props> = ({
  userPermits,
  toggleMuteStream,
  leaveRoom,
}) => {
  return (
    <UIBar className="bottom-0 justify-center space-x-4">
      <UIButton
        className={cx(
          'sm:w-auto w-full border-gray-900 ring-gray-700 bg-gray-800',
          !userPermits.audio ? 'text-red-600' : ''
        )}
        classIcon={cx(
          userPermits.audio ? 'fas fa-microphone' : 'fas fa-microphone-slash'
        )}
        onClick={toggleMuteStream}
      >
        {userPermits.audio ? 'Mute' : 'Unmute'}
      </UIButton>
      <span className="text-3xl text-gray-800">|</span>
      <UIButton
        className="sm:w-auto w-full border-gray-900 ring-red-700 bg-red-800"
        classIcon="fas fa-sign-out-alt"
        onClick={leaveRoom}
      >
        Leave
      </UIButton>
    </UIBar>
  );
};
