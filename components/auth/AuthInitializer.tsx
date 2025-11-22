"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { AppDispatch } from "@/redux/store";
import {
  refreshToken,
  userRefreshToken,
  userToken,
} from "@/redux/slice/user.slice";

const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useAppSelector(userToken);
  const refreshTokenValue = useAppSelector(userRefreshToken);
  const isRefreshing = useAppSelector((state) => state.user.isRefreshing);

  useEffect(() => {
    // Check if we have a refresh token but no access token (or token might be expired)
    // This handles the case where the page was refreshed and the access token expired
    if (
      refreshTokenValue &&
      (!token || isTokenExpired(token)) &&
      !isRefreshing
    ) {
      dispatch(refreshToken(refreshTokenValue));
    }
  }, [dispatch, refreshTokenValue, token, isRefreshing]);

  return <>{children}</>;
};

// Helper function to check if JWT token is expired
function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= exp;
  } catch {
    // If we can't parse the token, consider it expired
    return true;
  }
}

export default AuthInitializer;
