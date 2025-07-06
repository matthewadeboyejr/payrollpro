"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";

const ReduxStateDisplay = () => {
  const sidebarState = useAppSelector((state) => state.sidebar);

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-3">Redux Sidebar State</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="font-medium">Is Open:</span>
          <span
            className={`px-2 py-1 rounded ${
              sidebarState.isOpen
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {sidebarState.isOpen ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Is Mobile:</span>
          <span
            className={`px-2 py-1 rounded ${
              sidebarState.isMobile
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {sidebarState.isMobile ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Collapsed:</span>
          <span
            className={`px-2 py-1 rounded ${
              sidebarState.collapsed
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {sidebarState.collapsed ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Active Menu:</span>
          <span className="px-2 py-1 rounded bg-gray-100 text-gray-800 max-w-32 truncate">
            {sidebarState.activeMenu || "None"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReduxStateDisplay;
