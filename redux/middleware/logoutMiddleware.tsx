import apiSlice from "../../services/api/apiSlice";
import { logoutUser } from "../slice/user.slice";
import { Middleware } from "@reduxjs/toolkit";

const logoutMiddleware: Middleware = (store) => (next) => (action: any) => {
  if (action.type === logoutUser.type) {
    console.log(" Logout middleware triggered - resetting API state");
    store.dispatch(apiSlice.util.resetApiState());
  }
  return next(action);
};

export default logoutMiddleware;
