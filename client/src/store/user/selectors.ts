import { RootState } from '../rootReducer';
import { UserState } from './types';

export const userSelectors = {
  user: (s: RootState): UserState => s.user,
};
