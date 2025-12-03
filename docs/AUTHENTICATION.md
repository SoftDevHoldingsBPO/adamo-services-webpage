# Authentication & Route Protection Guide

## Overview

Comprehensive **client-side authentication** system with SSO support, automatic session management, and secure cookie-based authentication.

### ✅ What You Have

- **Global authentication check** - Auth status verified on app load for all pages
- **Public pages** - Accessible by everyone (home, about, contact, etc.)
- **Private pages** - Only for authenticated users (my-services, profile, etc.)
- **Full-page loader** - Smooth loading state while checking auth
- **HTTP-only cookies** - Secure session management (shared across Adamo services)
- **Auto-refresh** - Automatic token refresh when expired (with infinite loop prevention)
- **Session expiration handling** - Graceful session expiry with user notification
- **SSO Integration** - Single Sign-On support with redirect flows
- **Query parameter utilities** - Centralized auth query param management
- **First login redirect** - Automatic redirect to dashboard after first registration
- **User profile management** - Update profile info with optional avatar support
- **Profile state synchronization** - Real-time user state updates across the app

### 📂 Key Files & Structure

```bash
features/auth/
├── components/
│   ├── routing/
│   │   └── protected-route.tsx          # Route protection wrapper
│   ├── profile/
│   │   └── profile-dropdown.tsx         # User menu with app navigation
│   ├── sign-in/
│   │   ├── sign-in-dialog.tsx          # Sign in with redirect support
│   │   ├── enter-2fa-dialog.tsx        # 2FA verification
│   │   └── setup-2fa-dialog.tsx        # 2FA setup
│   └── session-expired-notification.tsx # Session expiry toast
├── contexts/
│   └── auth.context.tsx                 # Global auth state
├── hooks/
│   ├── use-sign-in-dialog.ts           # Sign in dialog with query params
│   └── use-first-login-redirect.ts     # First login redirect logic
├── utils/
│   └── auth-query.utils.ts             # Query parameter utilities
├── constants/
│   ├── auth-query-params.ts            # Query param constants
│   └── session-storage-keys.ts         # Session storage key constants
├── services/
│   └── auth.service.ts                 # API authentication logic
└── entities/
    └── user.entity.ts                   # User type definitions

features/profile/
├── components/
│   ├── personal-information-form.tsx   # Profile editor with photo upload
│   ├── profile-picture-upload.tsx      # Avatar upload component
│   ├── security-form.tsx               # Security settings
│   └── disable-2fa/                    # 2FA disable flow components
├── dtos/
│   ├── get-profile.dto.ts              # Profile response types
│   ├── update-profile.dto.ts           # Profile update types
│   └── update-profile-photo.dto.ts     # Photo update types
└── services/
    └── profile.service.ts              # Profile API methods

api/
└── api.ts                               # Axios with refresh interceptor

app/
├── logout/
│   └── page.tsx                         # SSO logout endpoint
├── profile/
│   └── page.tsx                         # User profile page
└── layout.tsx                           # AuthProvider wrapper

components/ui/
└── full-page-loader.tsx                 # Reusable loader component

messages/
├── en.json                              # English translations
└── es.json                              # Spanish translations
```

---

## 🚀 Quick Start

### Make a Page Private

Add `"use client";` at the top and wrap with `<ProtectedRoute>`:

```tsx
"use client";

import { ProtectedRoute } from "@/features/auth/components/routing/protected-route";

export default function MyPrivatePage() {
  return (
    <ProtectedRoute redirectTo="/">
      <div>
        <h1>This is a protected page</h1>
        <p>Only authenticated users can see this content.</p>
      </div>
    </ProtectedRoute>
  );
}
```

**What happens:**

1. Full-page loader appears instantly (reusable `FullPageLoader` component)
2. Checks authentication status from global auth context
3. **If authenticated** → Shows page content
4. **If not** → Redirects to home (`/`)

**Note:** Authentication is checked globally on app load, so the loader only shows briefly if the auth status is still loading.

### Check Auth Status Anywhere

```tsx
"use client";

import { useAuth } from "@/features/auth/contexts/auth.context";

export function MyComponent() {
  const { user, status } = useAuth();

  if (status === "authenticated") {
    return <p>Welcome {user?.name}!</p>;
  }

  return <button>Sign In</button>;
}
```

---

## 📚 Examples

### Protected Dashboard Page

```tsx
"use client";

import { ProtectedRoute } from "@/features/auth/components/routing/protected-route";
import { useAuth } from "@/features/auth/contexts/auth.context";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div>
        <h1>Welcome, {user?.name}!</h1>
        <p>Email: {user?.email}</p>
      </div>
    </ProtectedRoute>
  );
}
```

### Public Page with Conditional Content

```tsx
"use client";

import { useAuth } from "@/features/auth/contexts/auth.context";

import Link from "next/link";

export default function HomePage() {
  const { user, status } = useAuth();

  return (
    <div>
      <h1>Welcome to Our App</h1>

      {status === "authenticated" ? (
        <div>
          <p>Hello, {user?.name}!</p>
          <Link href="/my-services">Go to My Services</Link>
        </div>
      ) : (
        <div>
          <p>Please sign in to access your services.</p>
          <button
            onClick={() => {
              /* Open sign in dialog */
            }}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}
```

### Component with Auth Check

```tsx
"use client";

import { useAuth } from "@/features/auth/contexts/auth.context";

export function MyComponent() {
  const { user, status } = useAuth();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Please sign in to see this content.</div>;
  }

  return (
    <div>
      <p>Welcome {user?.name}!</p>
    </div>
  );
}
```

### SSO Integration - Open Sign In Dialog with Redirect

```tsx
import { AuthQueryUtils } from "@/features/auth/utils/auth-query.utils";

// Redirect to login with return URL
const loginUrl = AuthQueryUtils.getLoginUrl(
  "https://app.example.com/dashboard",
);
window.location.href = loginUrl;
// Results in: /?login_open=true&redirect_to=https://app.example.com/dashboard
```

### SSO Integration - Logout from Another App

```tsx
// From another Adamo service, redirect to logout endpoint
window.location.href = "https://landing.adamoservices.co/logout";
// This will:
// 1. Clear authentication cookies (shared across subdomains)
// 2. Redirect to home page
// 3. User is logged out from all Adamo services
```

### Update User Profile State

```tsx
"use client";

import { useAuth } from "@/features/auth/contexts/auth.context";

export function MyComponent() {
  const { user, setUser } = useAuth();

  const handleUpdateProfile = () => {
    // Update user state directly (e.g., after profile edit)
    setUser({
      name: "John",
      lastName: "Doe",
      email: "john@example.com",
      avatar: "https://example.com/avatar.jpg", // Optional
    });
  };

  return <div>{user?.name}</div>;
}
```

---

## 🔧 Customization

### Change Redirect Location

```tsx
<ProtectedRoute redirectTo="/login">{/* content */}</ProtectedRoute>
```

Default: Redirects to `/` (home page)

### Customize Loading UI

The `FullPageLoader` component (`components/ui/full-page-loader.tsx`) is reusable across the app:

```tsx
import { FullPageLoader } from "@/components/ui/full-page-loader";

// With custom message
<FullPageLoader message="Loading your data..." />

// With custom styling
<FullPageLoader className="bg-gray-100" message="Please wait..." />
```

### Using Auth Query Utilities

Centralized utilities for authentication query parameters:

```tsx
import { AuthQueryUtils } from "@/features/auth/utils/auth-query.utils";

// Check if session expired
if (AuthQueryUtils.hasSessionExpired(window.location.search)) {
  // Handle session expiration
}

// Check URLSearchParams
if (AuthQueryUtils.isSessionExpired(searchParams)) {
  // Show notification
}

// Build URLs with auth params
const loginUrl = AuthQueryUtils.getLoginUrl("https://redirect.url");
const sessionExpiredUrl = AuthQueryUtils.getSessionExpiredUrl();

// Check if login should open
if (AuthQueryUtils.shouldOpenLogin(searchParams)) {
  // Open login dialog
}

// Get redirect URL
const redirectUrl = AuthQueryUtils.getRedirectUrl(searchParams);

// Clean auth params from URL
AuthQueryUtils.cleanAuthParams();
```

### Available Query Parameters

Defined in `features/auth/constants/auth-query-params.ts`:

- `session_expired` - Indicates session has expired
- `redirect_to` - URL to redirect after authentication
- `login_open` - Trigger login dialog to open automatically

---

## 🔌 Authentication Flow

### How It Works

1. **App Load (All Pages)**:

   - `AuthProvider` starts with `status: "loading"`
   - Automatically calls `ProfileService.get()` to check for valid cookies
   - If cookies valid → sets `status: "authenticated"` with user data
   - If cookies invalid → sets `status: "unauthenticated"`
   - **Exception**: Skips auth check if `session_expired=true` in URL (prevents infinite loop)

2. **Protected Routes**:

   - `ProtectedRoute` wrapper checks auth status
   - Shows `FullPageLoader` while `status === "loading"`
   - Redirects to home if `status === "unauthenticated"`
   - Renders children if `status === "authenticated"`

3. **Sign In Flow**:

   - User submits credentials via `SignInDialog`
   - May require 2FA verification
   - On success, calls `fetchAndSetUser()` to update global auth state
   - Checks for `redirect_to` query param and redirects if present
   - **First login**: Marks first login in sessionStorage and redirects to `/my-services`
   - Shows success toast and closes dialog

4. **First Login Redirect**:

   - After successful registration and email verification
   - `useFirstLoginRedirect` hook marks login in sessionStorage
   - Automatically redirects to `/my-services` dashboard
   - Flag is cleared after redirect to prevent repeated redirects
   - Uses Next.js `router.push()` for client-side navigation

5. **Session Expiration**:

   - When refresh token expires, user is redirected to `/?session_expired=true`
   - `SessionExpiredNotification` component shows warning toast
   - Auth context skips verification to prevent infinite loop
   - User must sign in again

6. **Sign Out Flow**:

   - Calls `AuthService.signOut()` to clear server-side cookies
   - Updates auth context to `unauthenticated`
   - Uses Next.js `redirect()` for server-side navigation to home page

7. **Profile Updates**:
   - Profile changes update local auth state via `setUser()`
   - Supports optional avatar (users can have no profile picture)
   - Photo uploads handled separately from profile data
   - Form state syncs with latest profile data after updates

### Authentication Methods

Currently using **HTTP-only cookie-based authentication**:

**Cookies Set by Backend:**

- `adamo_access_token` - Short-lived access token (HTTP-only, Secure)
- `adamo_refresh_token` - Long-lived refresh token (HTTP-only, Secure)

**API Configuration** (`api/api.ts`):

- `withCredentials: true` - Sends cookies with all requests
- Locale header automatically added from cookie
- Custom base URL from environment variables

**Security Features:**

- HTTP-only cookies prevent XSS attacks
- Automatic credential sending with all requests
- Secure flag requires HTTPS in production
- SameSite attribute prevents CSRF attacks
- Cookies shared across `*.adamoservices.co` subdomains for SSO

---

## ⚠️ Security Notes

**HTTP-only cookie authentication with SSO support**

✅ **Security Features:**

1. **HTTP-only cookies** - Cannot be accessed by JavaScript (prevents XSS)
2. **Secure flag** - Cookies only sent over HTTPS in production
3. **SameSite attribute** - Prevents CSRF attacks
4. **Global auth validation** - Auth checked on every app load
5. **Session expiration handling** - Graceful handling with user notification
6. **Infinite loop prevention** - Smart detection of expired sessions

✅ **SSO Requirements:**

1. **HTTPS Required** - Cookies with `SameSite=None` require HTTPS
2. **Shared Domain** - Cookies shared across `*.adamoservices.co` subdomains
3. **Secure cookies** - Must have Secure and SameSite attributes set
4. **Local development setup**:
   - Use `npm run dev:host:secure` for HTTPS
   - Configure hosts file with `*.adamoservices.co` domains
   - Accept self-signed certificate in browser

**For Production:**

1. **Always use HTTPS** - Required for secure cookies and SSO
2. **Configure CORS** - Allow credentials from trusted Adamo service origins
3. **Set proper cookie attributes**:
   - `HttpOnly: true`
   - `Secure: true`
   - `SameSite: None` (for cross-subdomain SSO)
   - `Domain: .adamoservices.co` (for cookie sharing)
4. **Validate on backend** - Never trust client state alone
5. **Monitor sessions** - Track and invalidate suspicious sessions
6. **Rate limiting** - Prevent brute force attacks on auth endpoints

---

## 🐛 Troubleshooting

**Issue: Brief flash before redirect**
Normal behavior. The global auth check shows a loader briefly, then redirects if unauthenticated.

**Issue: Redirect loop**
Don't protect the redirect destination. If redirecting to `/`, don't wrap home page in `ProtectedRoute`.

**Issue: Session not persisting**
Cookies are managed by the server. Check:

- Backend is setting cookies correctly with proper attributes
- CORS is configured with `credentials: 'include'`
- `withCredentials: true` is set in API configuration
- Browser is not blocking cookies
- For SSO: Domain is set to `.adamoservices.co`

**Issue: Infinite loop on session expiration**
Fixed by checking for `session_expired=true` parameter and skipping auth verification when present.

**Issue: User data not showing on public pages**
This is expected! Auth is checked globally, so authenticated users will see their profile on all pages (public or protected).

**Issue: SSO not working between apps**
Check:

- All apps are using HTTPS (required for `SameSite=None` cookies)
- All apps are on `*.adamoservices.co` subdomains
- Cookies have `Domain: .adamoservices.co` attribute
- Cookie attributes include `Secure: true` and `SameSite: None`
- Local hosts file is configured correctly

**Issue: "Login required" on app navigation links in profile dropdown**
The profile dropdown shows "Go to [App]" links only when on that app's page (e.g., `/adamo-id`). This is intentional to avoid confusion.

**Issue: Can't test SSO locally**
Make sure you're using:

- `npm run dev:host:secure` (not `npm run dev`)
- HTTPS URLs: `https://landing-local.adamoservices.co:3000`
- Configured hosts file with all required domains
- Accepted self-signed certificate in browser

**Issue: Avatar not displaying**
The avatar field is optional in the User entity. Check:

- User has uploaded a profile photo
- Photo URL is valid and accessible
- Component handles `undefined` avatar gracefully
- Use `object-cover` class for proper image sizing

**Issue: Profile changes not reflecting**
Make sure to call `setUser()` after profile updates:

```tsx
const { setUser } = useAuth();

// After successful profile update
setUser({
  name: updatedProfile.name,
  lastName: updatedProfile.surname,
  email: updatedProfile.email,
  avatar: updatedProfile.photo || undefined,
});
```

---

## 🎯 Best Practices

1. **Always wrap protected pages** with `<ProtectedRoute>`
2. **Use `useAuth()` hook** to access user data and auth status
3. **Show loading states** while `status === "loading"`
4. **Handle unauthenticated states** gracefully on public pages
5. **Use AuthQueryUtils** for all auth-related query parameters
6. **Test SSO flows** with `npm run dev:host:secure` before deploying
7. **Never store sensitive data** in client state or localStorage
8. **Always validate auth** on the backend for sensitive operations
9. **Use `setUser()`** to update auth state after profile changes
10. **Use Next.js navigation** - `router.push()` for client-side, `redirect()` for server-side
11. **Handle optional avatars** - User entity supports users without profile pictures

---

## 📝 Additional Features

### User Profile Management

The profile module provides comprehensive user profile editing with:

- **Personal information** - Name, email (read-only), profile photo
- **Photo upload** - Support for PNG/JPEG images up to 50MB
- **Optional avatar** - Users can exist without profile pictures
- **Security settings** - Password change and 2FA management
- **Internationalization** - Full i18n support (English and Spanish)
- **State synchronization** - Profile changes update auth context automatically

**Profile Page Location**: `/profile`

**Key Components**:
- `PersonalInformationForm` - Edit user details and photo
- `ProfilePictureUpload` - Avatar upload with preview
- `SecurityForm` - Security settings
- `Disable2FADialog` - Multi-step 2FA disable flow

**Profile Service API**:
```tsx
import { ProfileService } from "@/features/profile/services/profile.service";

// Get current user profile
const user = await ProfileService.get();

// Update profile info
const response = await ProfileService.update({ name, surname });

// Update profile photo
const photoResponse = await ProfileService.updatePhoto({ photo: File });

// Delete profile photo
await ProfileService.deletePhoto();
```

### First Login Experience

After user registration and email verification, the system automatically:

1. Marks the login as "first login" in sessionStorage
2. Redirects to `/my-services` dashboard
3. Clears the first login flag to prevent repeated redirects

**Implementation**:
```tsx
import { useFirstLoginRedirect } from "@/features/auth/hooks/use-first-login-redirect";

// In sign-up flow
const { markAsFirstLogin } = useFirstLoginRedirect();
markAsFirstLogin(); // After email verification

// In sign-in flow
const { checkAndClearFirstLogin } = useFirstLoginRedirect();
const shouldRedirect = checkAndClearFirstLogin();
if (shouldRedirect) {
  router.push("/my-services");
}
```

---

**Example:** The `/my-services` and `/profile` pages are already protected - try them out!
