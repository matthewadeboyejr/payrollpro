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
import { FiLogOut } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/redux/slice/user.slice";

const SiderBar = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
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

  // Set active menu based on current pathname
  useEffect(() => {
    dispatch(setActiveMenu(pathname));
  }, [pathname, dispatch]);

  // Don't render sidebar on mobile when closed
  if (isMobile && !isOpen) {
    return null;
  }

  return (
    <aside
      className={`${isMobile ? "fixed inset-y-0 left-0 z-50" : "hidden md:flex flex-col"
        }  bg-white p-5 h-screen border-r border-gray-200 transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 ${collapsed ? "w-16 px-2" : "w-64"
        }`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-5 dark:border-gray-700">
          <div className="bg-gradient-to-r bg-blue-600 rounded-sm p-2 w-fit text-2xl text-white shrink-0">
            <LuBuilding2 className="" />
          </div>
          {!collapsed && (
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold dark:text-gray-100 truncate">PayrollPro</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Enterprise Edition</p>
              </div>
              <button
                onClick={() => dispatch(toggleSidebar())}
                aria-label="Close sidebar"
                className="bg-blue-100 p-2 rounded-lg md:hidden dark:bg-blue-900 dark:text-white shrink-0"
              >
                <IoClose className="text-blue-500 dark:text-white" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modules - Scrollable Area */}
      <div className="flex-1 flex flex-col gap-5 mt-5 overflow-y-auto no-scrollbar pb-10">
        {menus.map((menu) => {
          return (
            <div className="flex flex-col gap-2 shrink-0" key={menu.title}>
              {!collapsed && (
                <h4 className="text-[10px] uppercase tracking-widest text-gray-400 p-2 font-bold dark:text-gray-500">
                  {menu.title}
                </h4>
              )}
              <div className="flex flex-col gap-1">
                {menu.submenus.map((submenu) => {
                  const isActive = activeMenu === submenu.url;
                  return (
                    <Link
                      key={submenu.label}
                      href={submenu.url}
                      onClick={() => dispatch(setActiveMenu(submenu.url))}
                      className={`flex items-center gap-2 text-xs font-medium p-2 rounded-md transition-all duration-200 relative group ${isActive
                        ? "text-blue-600 bg-blue-50 border-l-2 border-blue-600 dark:text-blue-400 dark:bg-blue-900/30 dark:border-blue-400"
                        : "hover:text-black hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                        }`}
                    >
                      <div className="text-lg shrink-0"> {submenu.icon}</div>

                      {!collapsed && <div className="truncate">{submenu.label}</div>}

                      {/* Custom Tooltip for Collapsed State */}
                      {collapsed && (
                        <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg after:content-[''] after:absolute after:right-full after:top-1/2 after:-translate-y-1/2 after:border-4 after:border-transparent after:border-r-gray-900">
                          {submenu.label}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Logout Button - Fixed at bottom of flex container */}
      <div className="pt-5 border-t border-gray-100 dark:border-gray-700 shrink-0">
        <button
          onClick={() => {
            dispatch(logoutUser());
            router.push("/auth/login");
          }}
          className="flex items-center gap-2 text-xs font-medium p-2 rounded-md transition-all duration-200 relative group w-full text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <div className="text-lg shrink-0"> <FiLogOut /></div>
          {!collapsed && <div>Logout</div>}
          
          {collapsed && (
            <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg after:content-[''] after:absolute after:right-full after:top-1/2 after:-translate-y-1/2 after:border-4 after:border-transparent after:border-r-gray-900">
              Logout
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};

export default SiderBar;
