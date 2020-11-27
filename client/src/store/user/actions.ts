import { createAction } from '@reduxjs/toolkit';
import { UserTypes, UpdateUserAction } from './types';

export const userActions = {
  updateUser: createAction<UpdateUserAction['payload']>(UserTypes.UPDATE_USER),
  createStream: createAction(UserTypes.CREATE_STREAM),
};
