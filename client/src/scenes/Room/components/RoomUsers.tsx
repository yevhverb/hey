import React from 'react';
import { RoomUser as IRoomUser } from '../../../store/room';
import { RoomUser } from '../../RoomUser';

type Props = {
  userStream: MediaStream | null;
  roomUsers: IRoomUser[];
};

export const RoomUsers: React.FC<Props> = ({ userStream, roomUsers }) => {
  return (
    <div className="relative w-full flex-1 flex items-center py-3">
      <div className="w-full flex flex-wrap items-center justify-center">
        <RoomUser
          {...roomUsers[0]}
          userName="You"
          userStream={userStream}
          withMuted={false}
        />
        {roomUsers.slice(1).map((user) => (
          <RoomUser key={user.userId} {...user} />
        ))}
      </div>
    </div>
  );
};
