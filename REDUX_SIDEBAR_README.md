# Redux Sidebar Implementation

This document explains the Redux-based sidebar implementation in the PayrollPro application.

## Overview

The sidebar is now fully managed by Redux, providing:

- Responsive behavior (mobile/desktop)
- Collapsible sidebar functionality
- Active menu tracking
- Smooth transitions and animations

## Redux Store Structure

### Sidebar State

```typescript
interface SidebarState {
  isOpen: boolean; // Whether sidebar is visible
  isMobile: boolean; // Whether in mobile mode
  activeMenu: string; // Currently active menu item
  collapsed: boolean; // Whether sidebar is collapsed (desktop only)
}
```

## Actions Available

### `toggleSidebar()`

Toggles the sidebar open/closed state.

### `setSidebarOpen(boolean)`

Sets the sidebar to a specific open/closed state.

### `setMobileMode(boolean)`

Sets mobile mode and auto-closes sidebar on mobile.

### `setActiveMenu(string)`

Sets the currently active menu item.

### `toggleCollapsed()`

Toggles the collapsed state (desktop only).

### `setCollapsed(boolean)`

Sets the collapsed state to a specific value.

### `resetSidebar()`

Resets sidebar to default state.

## Usage Examples

### In Components

```typescript
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { toggleSidebar, setActiveMenu } from "@/redux/slice/sidebar.slice";

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { isOpen, isMobile, activeMenu } = useAppSelector((state) => state.sidebar);

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleMenuClick = (url: string) => {
    dispatch(setActiveMenu(url));
  };

  return (
    // Your component JSX
  );
};
```

## Features

### Responsive Design

- Automatically detects mobile/desktop viewport
- Mobile: Sidebar becomes overlay with backdrop
- Desktop: Sidebar is always visible, can be collapsed

### Collapsible Sidebar (Desktop)

- Click "Collapse" button in TopBar to minimize sidebar
- Shows only icons when collapsed
- Hover tooltips for menu labels

### Active Menu Tracking

- Highlights current active menu item
- Blue accent color and left border
- Persists across page navigation

### Mobile Overlay

- Full-screen overlay when sidebar is open on mobile
- Click outside to close
- Smooth slide-in animation

## Components Updated

1. **Sidebar Component** (`components/sidebar/SiderBar.tsx`)

   - Now uses Redux state
   - Responsive behavior
   - Collapsible functionality
   - Active menu highlighting

2. **TopBar Component** (`components/sidebar/TopBar.tsx`)

   - Toggle button for sidebar
   - Collapse button (desktop only)
   - Dynamic icon based on state

3. **Dashboard Layout** (`app/dashboard/layout.tsx`)

   - Mobile overlay support
   - Better responsive layout

4. **Redux Store** (`redux/store.tsx`)
   - Configured with sidebar reducer
   - TypeScript support

## State Display

A `ReduxStateDisplay` component is included on the dashboard page to show the current sidebar state for debugging and demonstration purposes.

## Future Enhancements

- Persist sidebar state in localStorage
- Add keyboard shortcuts (Ctrl+B to toggle)
- Animate sidebar transitions
- Add breadcrumb navigation
- Support for nested menu items
