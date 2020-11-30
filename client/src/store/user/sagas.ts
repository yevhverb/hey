import { call, put, select, take } from 'redux-saga/effects';
import { getMediaStream } from '../../utils';
import { roomSelectors, RoomState } from '../room';
import { userActions, UserTypes } from './';
import { userSelectors } from './selectors';
import { UserState } from './types';

/* global SocketIOClient */

export function* watchCreateStream() {
  try {
    while (true) {
      yield take(UserTypes.CREATE_STREAM);
      const userStream = yield call(getMediaStream);
      yield userStream.active && put(userActions.updateUser({ userStream }));
    }
  } catch (error) {
    // handle error
  }
}

export function* watchUpdateUser(socket: SocketIOClient.Socket) {
  try {
    while (true) {
      const { payload } = yield take(UserTypes.UPDATE_USER);
      const { roomId }: RoomState = yield select(roomSelectors.room);
      const { userId }: UserState = yield select(userSelectors.user);
      const { isGlobal, ...user } = payload;
      isGlobal && socket.emit('room_user_update', { ...user, userId, roomId });
    }
  } catch (error) {
    // handle error
  }
}
