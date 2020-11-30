import { createReducer } from '@reduxjs/toolkit';
import { UserTypes, UserState, UpdateUserAction } from './types';

const isBoolean = (value: boolean) => Boolean(value) === value;
const isNull = (value: null) => value === null;

export const userReducer = createReducer<UserState>(
  {
    userId: '',
    userName: '',
    userEmoji: '',
    userStream: null,
    userPermits: { audio: true },
  },
  {
    [UserTypes.UPDATE_USER]: (state, { payload }: UpdateUserAction) => {
      if (state?.userStream) {
        if (isBoolean(payload?.userPermits?.audio)) {
          state.userStream.getAudioTracks()[0].enabled =
            payload.userPermits.audio;
        }
        if (isNull(payload?.userStream)) {
          state.userStream.getTracks()[0].stop();
        }
      }
      state = { ...state, ...payload };
      return state;
    },
  }
);
