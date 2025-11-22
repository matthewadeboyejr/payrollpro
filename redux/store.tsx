import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sidebarReducer from "./slice/sidebar.slice";
import userReducer from "./slice/user.slice";
import registerReducer from "./slice/register.slice";
import apiSlice from "../services/api/apiSlice";
import logoutMiddleware from "./middleware/logoutMiddleware";

// Persist config for user slice
const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "token", "refreshToken", "isAuthenticated"], // Only persist these fields
};

// Persisted user reducer
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    user: persistedUserReducer,
    register: registerReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    })
      .concat(apiSlice.middleware)
      .concat(logoutMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
