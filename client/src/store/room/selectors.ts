import { RootState } from '../rootReducer';
import { RoomState } from './types';

export const roomSelectors = {
  room: (s: RootState): RoomState => s.room,
};
