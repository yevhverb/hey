import { createAction } from '@reduxjs/toolkit';
import {
  RoomTypes,
  CreateRoomAction,
  CheckRoomAction,
  JoinRoomAction,
  LeaveRoomAction,
  UpdateRoomAction,
  UpdateRoomUserAction,
  UpdateRoomUsersAction,
} from './types';

export const roomActions = {
  callRoomUsers: createAction(RoomTypes.CALL_ROOM_USERS),
  createRoom: createAction<CreateRoomAction['payload']>(RoomTypes.CREATE_ROOM),
  checkRoom: createAction<CheckRoomAction['payload']>(RoomTypes.CHECK_ROOM),
  joinRoom: createAction<JoinRoomAction['payload']>(RoomTypes.JOIN_ROOM),
  leaveRoom: createAction<LeaveRoomAction['payload']>(RoomTypes.LEAVE_ROOM),
  updateRoom: createAction<UpdateRoomAction['payload']>(RoomTypes.UPDATE_ROOM),
  updateRoomUser: createAction<UpdateRoomUserAction['payload']>(
    RoomTypes.UPDATE_ROOM_USER
  ),
  updateRoomUsers: createAction<UpdateRoomUsersAction['payload']>(
    RoomTypes.UPDATE_ROOM_USERS
  ),
};
