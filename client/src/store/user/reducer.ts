import { createReducer } from '@reduxjs/toolkit';
import { UserTypes, UserState, UpdateUserAction } from './types';

export const userReducer = createReducer<UserState>(
  {
    userId: '',
    userName: '',
    userEmoji: '',
    userStream: null,
  },
  {
    [UserTypes.UPDATE_USER]: (state, { payload }: UpdateUserAction) => {
      !payload.userStream && state.userStream?.getTracks()[0].stop();
      state = { ...state, ...payload };
      return state;
    },
  }
);
