const prefix = 'ROOM/';

export const RoomTypes = {
  CREATE_ROOM: `${prefix}CREATE_ROOM`,
  CHECK_ROOM: `${prefix}CHECK_ROOM`,
  JOIN_ROOM: `${prefix}JOIN_ROOM`,
  LEAVE_ROOM: `${prefix}LEAVE_ROOM`,
  UPDATE_ROOM: `${prefix}UPDATE_ROOM`,
  CALL_ROOM_USERS: `${prefix}CALL_ROOM_USERS`,
  UPDATE_ROOM_USER: `${prefix}UPDATE_ROOM_USER`,
  UPDATE_ROOM_USERS: `${prefix}UPDATE_ROOM_USERS`,
};

export interface RoomUser {
  userId: string;
  userName: string;
  userEmoji: string;
  userStream: MediaStream | null;
}

export interface RoomState {
  roomId: string;
  roomHost: string;
  roomUsers: RoomUser[];
  roomStatus: boolean;
  roomChecked: boolean;
}

export interface CreateRoomAction {
  type: typeof RoomTypes.CREATE_ROOM;
  payload: {
    roomId: string;
    userId: string;
  };
}

export interface CheckRoomAction {
  type: typeof RoomTypes.CHECK_ROOM;
  payload: {
    roomId: string;
  };
}

export interface JoinRoomAction {
  type: typeof RoomTypes.CREATE_ROOM;
  payload: {
    roomId: string;
    userId: string;
    userName: string;
    userEmoji: string;
  };
}

export interface LeaveRoomAction {
  type: typeof RoomTypes.LEAVE_ROOM;
  payload: {
    userId: string;
  };
}

export interface UpdateRoomAction {
  type: typeof RoomTypes.UPDATE_ROOM;
  payload: { [key in keyof Partial<RoomState>]: any } | null;
}

export interface UpdateRoomUserAction {
  type: typeof RoomTypes.UPDATE_ROOM_USER;
  payload: Partial<RoomUser>;
}

export interface UpdateRoomUsersAction {
  type: typeof RoomTypes.UPDATE_ROOM_USERS;
  payload: {
    isNew: boolean;
    roomUser: RoomUser;
  };
}
