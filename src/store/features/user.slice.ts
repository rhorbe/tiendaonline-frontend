import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { useAppSelector } from '../index';

export interface UserSliceProps {
  token: string | null;
  user: any | null;
}

const initialState: UserSliceProps = {
  token: null,
  user: null,
};

const UserSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    saveToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    saveUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
});


export const useUserSlice = () =>
  useAppSelector((state) => {
    return state.user;
  });

export const UserReducer = UserSlice.reducer;
export const { saveToken } = UserSlice.actions;
