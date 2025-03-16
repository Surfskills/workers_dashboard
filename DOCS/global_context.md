# Global Context Documentation

This document serves as the single source of truth for understanding the global context of our Next.js application. It provides an overview of the project structure, authentication flow, routing setup, and other critical aspects of the application.

## 1. Project Overview and Structure

This project is built using:
- **Next.js** with TypeScript for type safety
- **Tailwind CSS** for styling
- **App Router** for routing

### Key Directories:
- `src/`: Contains all source code
  - `src/app/`: Next.js App Router structure
  - `src/components/`: Reusable UI components
  - `src/services/`: Service layer for API interactions
  - `src/contexts/`: React contexts for global state management
- `public/`: Static assets
- `DOCS/`: Project documentation

### Configuration Files:
- `next.config.ts`: Next.js configuration
- `tsconfig.json`: TypeScript configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `package.json`: Dependencies and scripts

## 2. Authentication and Global Providers

### Authentication Flow

The authentication is managed through a custom implementation in `src/app/components/auth/AuthContext.tsx`. Key features include:

- JWT token storage in localStorage
- Token verification and refreshing mechanisms
- Login, logout, and registration functionality
- Protected routes requiring authentication

```typescript
// Reference to AuthContext.tsx
// The context provides:
// - user: The current authenticated user
// - login: Function to authenticate users
// - logout: Function to sign users out
// - register: Function to create new accounts
// - isAuthenticated: Boolean indicating auth status
```

### Global Providers

- `ClientLayout` (`src/app/components/ClientLayout.tsx`) wraps children elements with the `AuthProvider` to ensure authentication state is available throughout the application.
- A `Providers.tsx` file exists for `SessionProvider` but is currently commented out in the codebase.

## 3. Routing, Layout, and Global Styling

### App Router Structure

The application uses Next.js App Router, where each folder in `src/app/` represents a route segment.

### Global Layout

- `src/app/layout.tsx`: Defines the global layout including:
  - Font setup using Next.js font optimization
  - HTML and body structure
  - Global metadata

### Dashboard Layout

- `src/app/dashboard/layout.tsx`: Specific layout for dashboard pages including:
  - Header component
  - Footer component
  - Main content area
  - Navigation elements

## 4. Dashboard Functionality

The dashboard (`src/app/dashboard/page.tsx`) is the central hub of the application with several key features:

### Tabbed Navigation

The dashboard includes tabs for:
- **Available Orders**: Orders that can be claimed by workers
- **My Orders**: Orders assigned to the current user
- **Analytics**: Performance metrics and statistics
- **Settings**: User preferences and account settings
- **Support Ticket**: System for requesting assistance
- **Scheduling**: Calendar integration using Calendly

```typescript
// Reference to dashboard/page.tsx
// The dashboard implements a tab-based navigation system
// with conditional rendering based on the selected tab
```

## 5. Data and Service Integration

### Order Management

Order-related functionality is handled by `src/services/orderService.ts`, which provides:

- Functions for fetching available and user-specific orders
- Methods for completing orders
- File upload capabilities for order deliverables
- Order status management

```typescript
// Reference to orderService.ts
// Key functions include:
// - getOrders(): Fetches all available orders
// - getMyOrders(): Fetches orders assigned to the current user
// - completeOrder(): Marks an order as complete
// - uploadFile(): Uploads deliverables for an order
```

## 6. Planned Real-time Communication

A `WebSocketContext` (`src/app/contexts/WebSocketContext.tsx`) exists in the codebase but is currently commented out. This context was intended to:

- Establish WebSocket connections for real-time updates
- Provide event listeners for order status changes
- Enable instant notifications for new orders
- Support real-time chat functionality

When implemented, this will enhance the application with real-time capabilities.

## 7. Additional Notes

### API Integration

- Authentication endpoints are referenced in the `AuthContext` for login, registration, and token refresh
- Order-related API endpoints are used in `orderService.ts`
- API base URLs and configurations can be found in `next.config.ts`

### Configuration Details

The `next.config.ts` file contains important configuration details such as:
- Environment variables
- API routes
- Build optimizations
- Image optimization settings

## Conclusion

This document provides a comprehensive overview of the global context of our Next.js application. It serves as a reference for developers to understand the project structure, authentication flow, routing setup, and other critical aspects of the application.