export const reducer = (state, action) => {
  switch (action.type) {
    case "CONNECTED_PROVIDER": {
      state.provider = action.payload.provider;
      state.signer = action.payload.signer;
      state.name = action.payload.name;
      state.chainId = action.payload.chainId;
      state.sdk = action.payload.sdk;
      return;
    }

    default:
      break;
  }
};
