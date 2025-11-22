import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import enviroment from "../../configuration/siteConfig";
import { logoutUser, refreshToken } from "@/redux/slice/user.slice";
import { showAlert } from "@/components/ui/ShowAlert";
import { RootState } from "@/redux/store";

const baseQuery = fetchBaseQuery({
  baseUrl: enviroment.API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");

    // Get token from user slice first, then register slice
    const userToken = (getState() as RootState).user.token;
    const token = userToken as string;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const customBaseQuery = async (
  args: any,
  api: any,
  extraOptions: any
): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle authentication errors
  if (result.error) {
    const { status, data } = result.error;

    if (status === 401 || status === 406) {
      const state = api.getState() as RootState;
      const refreshTokenValue = state.user.refreshToken;
      const isRefreshing = state.user.isRefreshing;

      // If we have a refresh token and we're not already refreshing, try to refresh
      if (refreshTokenValue && !isRefreshing) {
        try {
          // Dispatch refresh token action
          const refreshResult = await api.dispatch(
            refreshToken(refreshTokenValue)
          );

          if (refreshToken.fulfilled.match(refreshResult)) {
            // Token refresh successful, retry the original request
            result = await baseQuery(args, api, extraOptions);
            return result;
          } else {
            // Token refresh failed, logout user
            api.dispatch(logoutUser());
            const errorMessage =
              (refreshResult.payload as string) || "Token refresh failed";
            showAlert("Authentication Error", errorMessage, "error");
            return result;
          }
        } catch (error: any) {
          // Error during refresh, logout user
          api.dispatch(logoutUser());
          const errorMessage = error?.message || "Token refresh failed";
          showAlert("Authentication Error", errorMessage, "error");
          return result;
        }
      } else {
        // No refresh token or already refreshing, logout user
        api.dispatch(logoutUser());
        const errorMessage = (data as any)?.message || "Authentication failed";
        showAlert("Authentication Error", errorMessage, "error");
        return result;
      }
    }
  }

  return result;
};

export default customBaseQuery;
