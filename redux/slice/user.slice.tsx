import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { User } from "./register.slice";
import { RootState } from "../store";
import enviroment from "@/configuration/siteConfig";

export interface UserState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  error: string | null;
  isAuthenticated: boolean;
  isRefreshing: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  refreshToken: null,
  error: null,
  isAuthenticated: false,
  isRefreshing: false,
};

// Refresh token thunk
export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (refreshTokenValue: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${enviroment.API_BASE_URL}auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: refreshTokenValue,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Token refresh failed");
      }

      const data = await response.json();

      if (data?.code === 200) {
        return {
          newAccessToken: data.data.newAccessToken,
          user: data.data.user,
          refreshToken: data.data.user.refreshToken,
        };
      }

      throw new Error(data?.message || "Token refresh failed");
    } catch (error: any) {
      return rejectWithValue(error.message || "Token refresh failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      const userObj = action.payload;
      let newState = { ...state };
      Object.assign(newState, userObj);
      return newState;
    },
    logoutUser(state) {
      let newState = { ...state };
      newState.user = null;
      newState.token = null;
      newState.refreshToken = null;
      newState.isAuthenticated = false;
      newState.isRefreshing = false;
      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.token = action.payload.newAccessToken;
        state.user = action.payload.user;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const userState = (state: RootState) => state.user;

export const userData = createSelector(userState, (state) => state.user);
export const userToken = createSelector(userState, (state) => state.token);
export const userRefreshToken = createSelector(
  userState,
  (state) => state.refreshToken
);
export const userIsAuthenticated = createSelector(
  userState,
  (state) => state.isAuthenticated
);
export const { updateUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
