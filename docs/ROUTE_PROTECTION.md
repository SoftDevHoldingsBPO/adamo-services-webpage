# Authentication & Route Protection Guide

## Overview

Simple **client-side authentication** system with public and private pages.

### ✅ What You Have
- **Public pages** - Accessible by everyone (home, about, contact, etc.)
- **Private pages** - Only for authenticated users (my-services, dashboard, etc.)
- **Full-page loader** - Smooth loading state while checking auth
- **HTTP-only cookies** - Secure session management (adamo_access_token, adamo_refresh_token)
- **Auto-refresh** - Automatic token refresh when expired
- **Session verification** - Server-side validation on load and reload

### 📂 Key Files
- `features/auth/contexts/auth.context.tsx` - Authentication state management
- `features/auth/services/auth.service.ts` - API authentication logic
- `features/auth/components/routing/protected-route.tsx` - Route protection wrapper
- `features/auth/entities/user.entity.ts` - User type definitions
- `api/api.ts` - Axios interceptors for cookie-based auth
- `app/my-services/page.tsx` - Example protected page

---

## 🚀 Quick Start

### Make a Page Private

Add `"use client";` at the top and wrap with `<ProtectedRoute>`:

```tsx
"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";

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
1. Full-page loader appears instantly
2. Calls `/auth/authorize` endpoint to verify session
3. **If authenticated** → Shows page content
4. **If not** → Redirects to home (`/`)

### Check Auth Status Anywhere

```tsx
"use client";

import { useAuth } from "@/providers/AuthProvider";

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

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/providers/AuthProvider";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div>
        <h1>Welcome, {user?.name}!</h1>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
      </div>
    </ProtectedRoute>
  );
}
```

### Public Page with Conditional Content

```tsx
"use client";

import { useAuth } from "@/providers/AuthProvider";
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
          <button onClick={() => {/* Open sign in dialog */}}>
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

import { useAuth } from "@/providers/AuthProvider";

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
      {user?.role === "admin" && (
        <button>Admin Controls</button>
      )}
    </div>
  );
}
```

---

## 🔧 Customization

### Change Redirect Location

```tsx
<ProtectedRoute redirectTo="/login">
  {/* content */}
</ProtectedRoute>
```

Default: Redirects to `/` (home page)

### Customize Loading UI

Edit `features/auth/components/routing/protected-route.tsx` to change the full-page loader appearance.

### Role-Based Routes

Create a custom component for role-specific access:

```tsx
"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (status === "unauthenticated" || user?.role !== "admin") {
      router.push("/");
    }
  }, [status, user, router]);

  if (status === "loading" || user?.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
```

---

## 🔌 Connect to Your Backend

Currently using **cookie-based authentication**. Tokens are automatically managed via HTTP-only cookies:

**Authentication Flow:**

1. **Sign In**: Call `AuthService.signIn()` - API sets cookies automatically
2. **Authorization Check**: Call `AuthService.authorize()` - validates session via cookies
3. **Token Refresh**: Automatic via axios interceptor when tokens expire
4. **Sign Out**: Call `AuthService.signOut()` - API clears cookies

**Cookies Set by Backend:**
- `adamo_access_token` - Short-lived access token (HTTP-only)
- `adamo_refresh_token` - Long-lived refresh token (HTTP-only)

**Security Features:**
- HTTP-only cookies prevent XSS attacks
- Automatic credential sending with `withCredentials: true`
- Token refresh handled transparently by API interceptor
```

---

## ⚠️ Security Notes

**This uses HTTP-only cookie authentication!**

✅ **Good for:**
- Preventing XSS attacks (tokens not accessible via JavaScript)
- Automatic credential management
- Secure token storage
- Production-ready authentication

✅ **Security features:**
1. **HTTP-only cookies** - Cannot be accessed by JavaScript
2. **Server-side validation** - `/auth/authorize` endpoint validates tokens
3. **Automatic token refresh** - Seamless session extension
4. **Secure by default** - Cookies sent only to same origin

**For production:**
1. **Use HTTPS** - Required for secure cookies
2. **Set SameSite attribute** - Prevent CSRF attacks
3. **Validate on backend** - Never trust client state alone
4. **Use secure cookie flags** - HttpOnly, Secure, SameSite

---

## 🐛 Troubleshooting

**Issue: Brief flash before redirect**  
Normal behavior. The loader appears, checks auth via `/auth/authorize`, then redirects.

**Issue: Redirect loop**  
Don't protect the redirect destination. If redirecting to `/`, don't wrap home page in `ProtectedRoute`.

**Issue: Session not persisting**  
Cookies are managed by the server. Check:
- Backend is setting cookies correctly
- CORS is configured to allow credentials
- `withCredentials: true` is set in API calls
- Browser is not blocking third-party cookies

**Issue: 401 errors after page refresh**  
Check that:
- `/auth/authorize` endpoint is working
- Cookies are being sent with requests
- Refresh token is valid and not expired

---

**Example:** The `/my-services` page is already protected - try it out!
