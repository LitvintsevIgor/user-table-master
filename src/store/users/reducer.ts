import { createReducer } from '@reduxjs/toolkit';

import { IUsersState } from './types';

import { generate, add } from './thunks';
import { deleteUser } from './actions';

const initialState: IUsersState = {
  fetching: false,
  users: [],
};

export const usersReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(generate.pending, (state) => ({ ...state, fetching: true }))
    .addCase(generate.fulfilled, (state, { payload }) => ({
      ...state,
      fetching: false,
      users: [...payload],
    }))
    .addCase(generate.rejected, (state) => ({
      ...state,
      fetching: false,
      users: [],
    }))
    .addCase(add.pending, (state) => ({ ...state, fetching: true }))
    .addCase(add.fulfilled, (state, { payload }) => ({
      ...state,
      fetching: false,
      users: [...payload, ...state.users],
    }))
    .addCase(add.rejected, (state) => ({
      ...state,
      fetching: false,
    }))
    .addCase(deleteUser, (state, { payload }) => ({
      ...state,
      users: state.users.filter((user) => user.login.uuid !== payload),
    }))
);
