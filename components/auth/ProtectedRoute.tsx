import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { userIsAuthenticated } from "@/redux/slice/user.slice";
import { useAppSelector } from "@/redux/hooks";
import Spinner from "../ui/Spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/auth",
}) => {
  const isAuthenticated = useAppSelector(userIsAuthenticated);
  const isRefreshing = useAppSelector((state) => state.user.isRefreshing);
  const router = useRouter();

  useEffect(() => {
    // Don't redirect if we're currently refreshing the token
    if (!isAuthenticated && !isRefreshing) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isRefreshing, router, redirectTo]);

  // Show loading spinner while checking authentication or refreshing token
  if (!isAuthenticated && !isRefreshing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  // Show loading spinner while refreshing token
  if (isRefreshing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
