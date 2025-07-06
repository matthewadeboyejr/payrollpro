"use client";

import React, { useEffect } from "react";
import menus from "../data/sidebarItem";
import { LuBuilding2 } from "react-icons/lu";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  setMobileMode,
  setActiveMenu,
  toggleSidebar,
} from "@/redux/slice/sidebar.slice";
import { IoClose } from "react-icons/io5";

const SiderBar = () => {
  const dispatch = useAppDispatch();
  const { isOpen, isMobile, activeMenu, collapsed } = useAppSelector(
    (state) => state.sidebar
  );

  // Handle mobile detection
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      dispatch(setMobileMode(isMobileView));
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  // Don't render sidebar on mobile when closed
  if (isMobile && !isOpen) {
    return null;
  }

  return (
    <aside
      className={`${
        isMobile ? "fixed inset-y-0 left-0 z-50" : "hidden md:block"
      }  bg-white p-5 h-screen border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2 border-b border-gray-200 pb-5">
          <div className="bg-gradient-to-r bg-blue-600 rounded-sm p-2 w-fit text-2xl text-white">
            <LuBuilding2 className="" />
          </div>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold">PayrollPro</h1>
                <p className="text-sm text-gray-500">Enterprise Edition</p>
              </div>
              <button
                onClick={() => dispatch(toggleSidebar())}
                aria-label="Close sidebar"
                className="bg-blue-100 p-2 rounded-lg md:hidden"
              >
                <IoClose className="text-blue-500" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modules */}
      <div className="flex flex-col gap-5 mt-5">
        {menus.map((menu) => {
          return (
            <div className="flex flex-col gap-2" key={menu.title}>
              {!collapsed && (
                <h4 className="text-sm opacity-50 p-2 font-medium">
                  {menu.title}
                </h4>
              )}
              <div className="flex flex-col gap-2">
                {menu.submenus.map((submenu) => {
                  const isActive = activeMenu === submenu.url;
                  return (
                    <Link
                      key={submenu.label}
                      href={submenu.url}
                      onClick={() => dispatch(setActiveMenu(submenu.url))}
                      className={`flex items-center gap-2 text-xs font-medium p-2 rounded-md transition-all duration-200 ${
                        isActive
                          ? "text-blue-600 bg-blue-50 border-l-2 border-blue-600"
                          : "hover:text-black hover:bg-gray-100"
                      }`}
                      title={collapsed ? submenu.label : undefined}
                    >
                      <div> {submenu.icon}</div>

                      {!collapsed && <div>{submenu.label}</div>}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default SiderBar;
