import { createSlice } from "@reduxjs/toolkit";

export const initialUserState = {
  isLoading: true,
  isConnected: false,
  user: {
    address: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user.address = payload.address;
      state.isConnected = true;
      state.isLoading = false;
    },
    disconnectUser: (state) => {
      state.isConnected = initialUserState.isConnected;
      state.isLoading = initialUserState.isLoading;
      state.user = initialUserState.user;
    },
  },
});

export const { setUser, disconnectUser } = userSlice.actions;

export default userSlice.reducer;
