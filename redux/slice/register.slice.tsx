/* import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  messages: [],
  error: null,
  users: [],
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    saveToken(state, action) {
      const userObj = action.payload;
      let newState = { ...state };
      Object.assign(newState, userObj);
      return newState;
    },
    clearToken(state) {
      let newState = { ...state };
      newState.token = null;
      return newState;
    },
  },
});

export const { saveToken, clearToken } = registerSlice.actions;
export default registerSlice.reducer;
 */
