# Authentication Redux System

This document outlines the complete authentication system built with Redux Toolkit for the PayrollPro application.

## Overview

The authentication system consists of:

- **Redux Slices**: `user.slice.tsx` and `register.slice.tsx`
- **Custom Hook**: `useAuth.tsx` for easy integration
- **Components**: Signup, Signin, LogoutButton, and ProtectedRoute
- **TypeScript Types**: Comprehensive type definitions

## Redux Store Structure

### Register Slice (`register.slice.tsx`)

Handles user registration and authentication state:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  userRoleId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  check?: boolean;
}

interface SigninData {
  email: string;
  password: string;
  check?: boolean;
}
```

**Actions:**

- `signupUser(signupData)` - Async thunk for user registration
- `signinUser(signinData)` - Async thunk for user login
- `clearError()` - Clear authentication errors
- `clearAuth()` - Clear all authentication data
- `setCredentials(user, token, refreshToken)` - Set user credentials

**Selectors:**

- `selectUser` - Get current user
- `selectToken` - Get authentication token
- `selectIsAuthenticated` - Check if user is authenticated
- `selectAuthLoading` - Get loading state
- `selectAuthError` - Get error messages

### User Slice (`user.slice.tsx`)

Handles user management and logout:

**Actions:**

- `logoutUser()` - Async thunk for user logout
- `refreshToken()` - Async thunk for token refresh
- `updateUser(userData)` - Update user information
- `setUser(user, token, refreshToken)` - Set user data
- `clearUser()` - Clear user data
- `clearError()` - Clear errors

**Selectors:**

- `selectCurrentUser` - Get current user
- `selectIsAuthenticated` - Check authentication status
- `selectUserLoading` - Get loading state
- `selectUserError` - Get error messages

## Custom Hook: `useAuth`

The `useAuth` hook provides a simple interface for authentication:

```typescript
const {
  // State
  isAuthenticated,
  user,
  loading,
  error,
  // Actions
  signup,
  signin,
  logout,
  clearError,
} = useAuth();
```

## Components

### 1. Signup Component (`Signup.tsx`)

- Integrates with Redux for user registration
- Shows loading states and error messages
- Redirects to dashboard on successful signup
- Includes form validation

### 2. Signin Component (`Signin.tsx`)

- Integrates with Redux for user login
- Shows loading states and error messages
- Redirects to dashboard on successful signin
- Includes form validation

### 3. LogoutButton Component (`LogoutButton.tsx`)

- Reusable logout button component
- Handles logout process and redirects
- Shows loading state during logout

### 4. ProtectedRoute Component (`ProtectedRoute.tsx`)

- Wraps components that require authentication
- Redirects unauthenticated users to login
- Shows loading spinner while checking authentication

## Usage Examples

### Basic Authentication Flow

```typescript
import { useAuth } from "@/redux/hooks/useAuth";

function MyComponent() {
  const { signin, signup, logout, isAuthenticated, user, loading, error } =
    useAuth();

  const handleSignin = async (credentials) => {
    try {
      await signin(credentials);
      // User will be redirected automatically
    } catch (error) {
      console.error("Signin failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // User will be redirected to auth page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>Please sign in</div>
      )}
    </div>
  );
}
```

### Protected Routes

```typescript
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function Dashboard() {
  return (
    <ProtectedRoute>
      <div>This content is only visible to authenticated users</div>
    </ProtectedRoute>
  );
}
```

### Form Integration

```typescript
import { Form } from "react-final-form";
import { useAuth } from "@/redux/hooks/useAuth";

function SigninForm() {
  const { signin, loading, error } = useAuth();

  const onSubmit = async (values) => {
    await signin(values);
  };

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <button type="submit" disabled={submitting || loading}>
            {submitting || loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      )}
    </Form>
  );
}
```

## API Integration

The Redux slices are configured to work with REST API endpoints:

- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Token refresh

## Error Handling

The system includes comprehensive error handling:

- Network errors are caught and displayed
- API errors are properly formatted
- Loading states are managed automatically
- Errors can be cleared manually

## TypeScript Support

Full TypeScript support with:

- Type-safe Redux actions and state
- Proper typing for all components
- Interface definitions for API responses
- Type-safe selectors and hooks

## Security Features

- Token-based authentication
- Refresh token support
- Automatic token refresh
- Secure logout with token invalidation
- Protected route implementation

## Getting Started

1. Ensure Redux store is properly configured with both slices
2. Wrap your app with the Redux Provider
3. Use the `useAuth` hook in components that need authentication
4. Wrap protected routes with `ProtectedRoute` component
5. Implement the API endpoints for authentication

## Future Enhancements

- Add password reset functionality
- Implement two-factor authentication
- Add role-based access control
- Include session management
- Add remember me functionality
