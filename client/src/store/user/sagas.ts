import { call, put, take } from 'redux-saga/effects';
import { getMediaStream } from '../../utils';
import { userActions, UserTypes } from './';

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
