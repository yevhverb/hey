import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getRandomEmoji, toClipboard } from '../../utils';
import { roomActions, roomSelectors } from '../../store/room';
import { userActions, userSelectors } from '../../store/user';
import { withRoomCheck } from './withRoomCheck';
import {
  RoomTopBar,
  RoomEnter,
  RoomUsers,
  RoomMessage,
  RoomBottomBar,
} from './components';

export const Room = withRoomCheck(() => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { roomId } = useParams<{ roomId: string }>();
  const { roomUsers } = useSelector(roomSelectors.room);
  const { userId, userStream } = useSelector(userSelectors.user);
  const [loadingRoom, setLoadingRoom] = React.useState(false);
  const [isCalledRoom, setIsCalledRoom] = React.useState(false);
  const [userEmoji] = React.useState(getRandomEmoji());

  React.useEffect(() => {
    document.title = ['Hey', roomId].join(' | ');
    return () => {
      document.title = 'Hey';
      dispatch(roomActions.leaveRoom({ userId }));
      dispatch(userActions.updateUser({ userStream: null }));
    };
  }, []);

  React.useEffect(() => {
    if (roomUsers.length) {
      setLoadingRoom(false);
      !userStream && dispatch(userActions.createStream());
    }
  }, [roomUsers]);

  React.useEffect(() => {
    if (!isCalledRoom && userStream) {
      dispatch(roomActions.callRoomUsers());
      setIsCalledRoom(true);
    }
  }, [userStream]);

  const copyRoomLink = () => toClipboard(window.location.href);

  const leaveRoom = () => {
    dispatch(roomActions.updateRoom(null));
    history.push('/');
  };

  const joinRoom = ({ userName }: { userName: string }) => {
    setLoadingRoom(true);
    dispatch(
      roomActions.joinRoom({
        roomId,
        userId,
        userName,
        userEmoji,
      })
    );
  };

  if (loadingRoom) {
    return <RoomMessage loader>Loading...</RoomMessage>;
  }

  if (!roomUsers.length) {
    return (
      <RoomEnter
        userEmoji={userEmoji}
        leaveRoom={leaveRoom}
        joinRoom={joinRoom}
      />
    );
  }

  if (!userStream) {
    return <RoomMessage loader>Please allow to use micro...</RoomMessage>;
  }

  return (
    <React.Fragment>
      <RoomTopBar roomId={roomId} copyRoomLink={copyRoomLink} />
      <RoomUsers userStream={userStream} roomUsers={roomUsers} />
      <RoomBottomBar leaveRoom={leaveRoom} />
    </React.Fragment>
  );
});
