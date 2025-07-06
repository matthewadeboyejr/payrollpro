import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  isOpen: boolean;
  isMobile: boolean;
  activeMenu: string;
  collapsed: boolean;
}

const initialState: SidebarState = {
  isOpen: true,
  isMobile: false,
  activeMenu: "",
  collapsed: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setMobileMode: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
      // Auto-close sidebar on mobile when switching to mobile mode
      if (action.payload && state.isOpen) {
        state.isOpen = false;
      }
    },
    setActiveMenu: (state, action: PayloadAction<string>) => {
      state.activeMenu = action.payload;
    },
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
    resetSidebar: (state) => {
      state.isOpen = true;
      state.activeMenu = "";
      state.collapsed = false;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setMobileMode,
  setActiveMenu,
  toggleCollapsed,
  setCollapsed,
  resetSidebar,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
