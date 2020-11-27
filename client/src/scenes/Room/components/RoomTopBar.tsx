import React from 'react';
import { UIBar, UIButton } from '../../../components/UI';

type Props = {
  roomId: string;
  copyRoomLink: () => void;
};

export const RoomTopBar: React.FC<Props> = ({ roomId, copyRoomLink }) => {
  return (
    <UIBar className="top-0 justify-between">
      <UIButton
        className="border-gray-900 ring-gray-700 bg-gray-800"
        classIcon="fas fa-clone"
        onClick={copyRoomLink}
      >
        Copy link
      </UIButton>
      <span className="text-lg font-bold">
        <span className="text-gray-600">Room ID:</span> {roomId}
      </span>
    </UIBar>
  );
};
