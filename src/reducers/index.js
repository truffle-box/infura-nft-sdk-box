export const reducer = (state, action) => {
    switch (action.type) {
      case "CONNECTED_PROVIDER": {
        state.provider = action.payload.provider;
        state.signer = action.payload.signer;
        state.name = action.payload.name;
        state.chainId = action.payload.chainId;
        state.contract = action.payload.contract;
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
  
      case "CONNECTED_CONTRACTS": {
        state.contract = action.payload;
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
  
      case "TRANSACTION_UPDATE": {
        state.user.balance = action.payload.balance;
        state.user.allowance = action.payload.allowance;
        return;
      }
  
      case "SET_SNAPS": {
        state.snaps = action.payload.snaps;
        return;
      }
  
      default:
        break;
    }
  };
  