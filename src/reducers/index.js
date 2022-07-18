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

    case "CONNECTED_NETWORK": {
      state.chainId = action.payload;
      return;
    }

    case "CONNECTED_SIGNER": {
      state.signer = action.payload;
      return;
    }

    case "CONNECTED_CONTRACT": {
      state.contract = action.payload.contractAddress;
      return;
    }

    case "SET_ACCOUNT": {
      state.user = action.payload;
      state.isLoading = false;
      state.isConnected = true;
      return;
    }

    case "DISCONNECT_ACCOUNT": {
      state = action.payload;
      return;
    }

    case "CLEAR_MODAL": {
      state.trxFeedback = action.payload;
      return;
    }

    default:
      break;
  }
};
