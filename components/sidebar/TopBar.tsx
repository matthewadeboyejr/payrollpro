"use client";

import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdMenuOpen, MdMenu } from "react-icons/md";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { toggleSidebar, toggleCollapsed } from "@/redux/slice/sidebar.slice";
import { userData, userIsAuthenticated } from "@/redux/slice/user.slice";
import LogoutButton from "../auth/LogoutButton";
import menus from "../data/sidebarItem";

const TopBar = () => {
  const dispatch = useAppDispatch();
  const { isOpen, isMobile, collapsed, activeMenu } = useAppSelector(
    (state) => state.sidebar
  );
  const user = useAppSelector(userData);
  const isAuthenticated = useAppSelector(userIsAuthenticated);

  // Function to get page title from active menu
  const getPageTitle = () => {
    if (!activeMenu || activeMenu === "/dashboard") return "Overview";

    // Find the menu item that matches the active menu URL
    for (const menu of menus) {
      const foundSubmenu = menu.submenus.find(
        (submenu) => submenu.url === activeMenu
      );
      if (foundSubmenu) {
        return foundSubmenu.label;
      }
    }

    // Handle edge cases for pages that might not be in the menu
    if (activeMenu.includes("/dashboard/")) {
      // Extract the page name from the URL and format it
      const pageName = activeMenu.split("/dashboard/")[1];
      if (pageName) {
        return pageName
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
    }

    return "Overview";
  };

  return (
    <aside className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="text-2xl md:hidden bg-blue-100 p-2 rounded-lg hover:bg-blue-200 transition-all duration-300 cursor-pointer"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <MdMenuOpen /> : <MdMenu />}
        </button>

        {!isMobile && (
          <button
            onClick={() => dispatch(toggleCollapsed())}
            className="text-sm bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200 transition-all duration-300"
            aria-label="Collapse sidebar"
          >
            {collapsed ? "Expand" : "Collapse"}
          </button>
        )}

        <h1 className="text-sm md:text-lg  font-semibold">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-sm text-black bg-blue-100 p-3 rounded-lg">
          <IoNotificationsOutline />
        </p>
        <p className="text-xs text-black font-semibold bg-gray-200 py-1 px-2 rounded-sm text-nowrap">
          Live Data
        </p>
        {user && isAuthenticated && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <LogoutButton className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors duration-200">
              Logout
            </LogoutButton>
          </div>
        )}
      </div>
    </aside>
  );
};

export default TopBar;
