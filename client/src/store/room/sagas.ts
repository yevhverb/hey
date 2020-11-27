import Peer from 'peerjs';
import { eventChannel } from 'redux-saga';
import { call, take, put, select } from 'redux-saga/effects';
import { store } from '../';
import { userActions, userSelectors, UserState } from '../user';
import { roomActions, roomSelectors } from './';
import {
  CheckRoomAction,
  RoomState,
  RoomTypes,
  UpdateRoomAction,
  UpdateRoomUsersAction,
} from './types';

/* global SocketIOClient */

function roomChannel(socket: SocketIOClient.Socket, peer: Peer) {
  return eventChannel((emit) => {
    socket.on('room_update', (room: UpdateRoomAction['payload']) => {
      emit(roomActions.updateRoom(room));
    });
    socket.on('room_update_users', (user: UpdateRoomUsersAction['payload']) => {
      emit(roomActions.updateRoomUsers(user));
    });
    socket.on('room_status', (room: CheckRoomAction['payload']) => {
      emit(roomActions.updateRoom({ ...room, roomChecked: true }));
    });
    peer.on('call', (call) => {
      call.answer(store.getState().user.userStream as MediaStream);
      call.on('stream', (remoteStream) => {
        store.dispatch(
          roomActions.updateRoomUser({
            userId: call.peer,
            userStream: remoteStream,
          })
        );
      });
    });
    return () => {};
  });
}

export function* watchRoomChannel(socket: SocketIOClient.Socket, peer: Peer) {
  try {
    const channel = yield call(roomChannel, socket, peer);
    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } catch (error) {
    // handle error
  }
}

export function* watchCreateRoom(socket: SocketIOClient.Socket) {
  try {
    while (true) {
      const { payload } = yield take(RoomTypes.CREATE_ROOM);
      socket.emit('room_create', payload);
    }
  } catch (error) {
    // handle error
  }
}

export function* watchCheckRoom(socket: SocketIOClient.Socket) {
  try {
    while (true) {
      const { payload } = yield take(RoomTypes.CHECK_ROOM);
      socket.emit('room_check', payload);
    }
  } catch (error) {
    // handle error
  }
}

export function* watchJoinRoom(socket: SocketIOClient.Socket) {
  try {
    while (true) {
      const { payload } = yield take(RoomTypes.JOIN_ROOM);
      const { roomId, ...user } = payload;
      yield put(userActions.updateUser({ ...user }));
      socket.emit('room_join', { roomId, ...user });
    }
  } catch (error) {
    // handle error
  }
}

export function* watchCallRoomUsers(peer: Peer) {
  try {
    yield take(RoomTypes.CALL_ROOM_USERS);
    const { roomUsers }: RoomState = yield select(roomSelectors.room);
    const { userStream }: UserState = yield select(userSelectors.user);
    roomUsers.slice(1).forEach(({ userId }) => {
      const call = peer.call(userId, userStream as MediaStream);
      call.on('stream', (remoteStream) => {
        store.dispatch(
          roomActions.updateRoomUser({
            userId,
            userStream: remoteStream,
          })
        );
      });
    });
  } catch (error) {
    // handler error
  }
}

export function* watchLeaveRoom(socket: SocketIOClient.Socket) {
  try {
    while (true) {
      const { payload } = yield take(RoomTypes.LEAVE_ROOM);
      socket.emit('room_leave', payload);
    }
  } catch (error) {
    // handle error
  }
}
