import { call, put, fork } from 'redux-saga/effects';
import { connectPeer, connectSocket } from './rootServices';
import { userActions, userSagas } from './user';
import { roomSagas } from './room';

export function* rootSaga() {
  const peer = yield call(connectPeer);
  const socket = yield call(connectSocket);
  yield put(userActions.updateUser({ userId: peer.id }));
  yield fork(userSagas.watchCreateStream);
  yield fork(userSagas.watchUpdateUser, socket);
  yield fork(roomSagas.watchCreateRoom, socket);
  yield fork(roomSagas.watchCheckRoom, socket);
  yield fork(roomSagas.watchJoinRoom, socket);
  yield fork(roomSagas.watchLeaveRoom, socket);
  yield fork(roomSagas.watchCallRoomUsers, peer);
  yield fork(roomSagas.watchRoomChannel, socket, peer);
}
