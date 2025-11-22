import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  userRoleId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  check?: boolean;
}

export interface SigninData {
  email: string;
  password: string;
  check?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

// Initial state
const initialState = {
  user: null as User | null,
  token: null as string | null,
  refreshToken: null as string | null,
  loading: false,
  error: null as string | null,
  isAuthenticated: false,
};

// Async thunks
export const signupUser = createAsyncThunk(
  "register/signupUser",
  async (signupData: SignupData, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const data: AuthResponse = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Signup failed");
    }
  }
);

export const signinUser = createAsyncThunk(
  "register/signinUser",
  async (signinData: SigninData, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signinData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signin failed");
      }

      const data: AuthResponse = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Signin failed");
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setCredentials(state, action) {
      const { user, token, refreshToken } = action.payload;
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // Signin cases
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

// Selectors
export const selectRegisterState = (state: RootState) => state.register;
export const selectUser = createSelector(
  selectRegisterState,
  (state) => state.user
);
export const selectToken = createSelector(
  selectRegisterState,
  (state) => state.token
);
export const selectIsAuthenticated = createSelector(
  selectRegisterState,
  (state) => state.isAuthenticated
);
export const selectAuthLoading = createSelector(
  selectRegisterState,
  (state) => state.loading
);
export const selectAuthError = createSelector(
  selectRegisterState,
  (state) => state.error
);

export const { clearError, clearAuth, setCredentials } = registerSlice.actions;
export default registerSlice.reducer;
