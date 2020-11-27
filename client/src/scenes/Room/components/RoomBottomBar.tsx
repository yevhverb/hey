import React from 'react';
import { UIButton, UIBar } from '../../../components/UI';

type Props = {
  leaveRoom: () => void;
};

export const RoomBottomBar: React.FC<Props> = ({ leaveRoom }) => {
  return (
    <UIBar className="bottom-0 justify-center space-x-4">
      {/* <UIButton
        className="sm:w-auto w-full border-gray-900 ring-gray-700 bg-gray-800"
        classIcon="fas fa-microphone"
        onClick={() => {}}
      >
        Mute
      </UIButton>
      <span className="text-3xl text-gray-800">|</span> */}
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
