import { createSlice } from "@reduxjs/toolkit";

export const contractInitialState = {
  type: null,
  address: null,
  metaData: null,
};

export const contractSlice = createSlice({
  name: "contract",
  initialState: contractInitialState,
  reducers: {
    setContract: (state, { payload }) => {
      const contract = payload;
      state.type = contract.type;
      state.address = contract.address;
      state.metaData = contract.metaData
    },
    disconnectContract: (state) => {
      state.type = contractInitialState.type;
      state.address = contractInitialState.address;
    },
  },
});

export const { setContract, disconnectContract } = contractSlice.actions;

export default contractSlice.reducer;
