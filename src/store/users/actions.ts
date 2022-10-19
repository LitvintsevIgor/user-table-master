import { createAction } from '@reduxjs/toolkit';

import { IUser } from '../../models';

export const setUsers = createAction<IUser[]>('users.setReady');
export const deleteUser = createAction<string>('users.deleteUser');
export const setUser = createAction<IUser>('users.setUser');
