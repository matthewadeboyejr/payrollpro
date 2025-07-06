"use client";

import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdMenuOpen, MdMenu } from "react-icons/md";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { toggleSidebar, toggleCollapsed } from "@/redux/slice/sidebar.slice";

const TopBar = () => {
  const dispatch = useAppDispatch();
  const { isOpen, isMobile, collapsed } = useAppSelector(
    (state) => state.sidebar
  );

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

        <h1 className="text-sm md:text-lg  font-semibold">
          Employee Management
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-sm text-black bg-blue-100 p-3 rounded-lg">
          <IoNotificationsOutline />
        </p>
        <p className="text-xs text-black font-semibold bg-gray-200 py-1 px-2 rounded-sm text-nowrap">
          Live Data
        </p>
      </div>
    </aside>
  );
};

export default TopBar;
