import { combineReducers } from 'redux';
import { userReducer as user, UserState } from './user';
import { roomReducer as room, RoomState } from './room';

export type RootState = {
  user: UserState;
  room: RoomState;
};

export const rootReducer = combineReducers<RootState>({
  user,
  room,
});
