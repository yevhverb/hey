import { createReducer } from '@reduxjs/toolkit';
import {
  RoomState,
  RoomTypes,
  UpdateRoomAction,
  UpdateRoomUserAction,
  UpdateRoomUsersAction,
} from './types';

const initialState = {
  roomId: '',
  roomHost: '',
  roomUsers: [],
  roomStatus: false,
  roomChecked: false,
};

export const roomReducer = createReducer<RoomState>(initialState, {
  [RoomTypes.UPDATE_ROOM]: (state, { payload }: UpdateRoomAction) => {
    state = !payload ? initialState : { ...state, ...payload };
    return state;
  },
  [RoomTypes.UPDATE_ROOM_USERS]: (
    state,
    { payload }: UpdateRoomUsersAction
  ) => {
    state.roomUsers = payload.isNew
      ? [...state.roomUsers, payload.roomUser]
      : state.roomUsers.filter((u) => u.userId !== payload.roomUser.userId);
    return state;
  },
  [RoomTypes.UPDATE_ROOM_USER]: (state, { payload }: UpdateRoomUserAction) => {
    const userIndex = state.roomUsers.findIndex(
      (u) => u.userId === payload.userId
    );
    state.roomUsers[userIndex] = { ...state.roomUsers[userIndex], ...payload };
    return state;
  },
});
