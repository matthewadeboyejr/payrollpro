import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logoutUser } from "@/redux/slice/user.slice";

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  className = "primary-btn",
  children = "Logout",
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      router.push("/auth");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button onClick={handleLogout} className={className}>
      {children}
    </button>
  );
};

export default LogoutButton;
