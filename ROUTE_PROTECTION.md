# Authentication & Route Protection Guide

## Overview

Simple **client-side authentication** system with public and private pages.

### ✅ What You Have
- **Public pages** - Accessible by everyone (home, about, contact, etc.)
- **Private pages** - Only for authenticated users (my-services, dashboard, etc.)
- **Full-page loader** - Smooth loading state while checking auth
- **localStorage** - Session persistence across page refreshes
- **Auto-logout** - Token expiration checking (every 5 seconds)

### � Key Files
- `providers/AuthProvider.tsx` - Authentication state management
- `services/auth.ts` - API authentication logic
- `components/ProtectedRoute.tsx` - Route protection wrapper
- `types/user.ts` - User type definitions
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
2. Checks localStorage for authentication
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

### Change Token Expiration

Edit `services/auth.ts` (around line 40):

```typescript
accessTokenExpires: Date.now() + 3600000, // 1 hour instead of 30 seconds
```

### Customize Loading UI

Edit `components/ProtectedRoute.tsx` to change the full-page loader appearance.

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

Currently using **mock authentication**. To connect to your real API:

**Edit `services/auth.ts`:**

```typescript
public static async signIn({ email, password }) {
  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    return { ok: false, error: data.message };
  }
  
  return { ok: true, user: data.user };
}
```

---

## ⚠️ Security Notes

**This is client-side only authentication!**

✅ **Good for:**
- Controlling UI based on auth state
- Preventing accidental page access
- Simple apps without sensitive data

❌ **NOT secure for:**
- Protecting sensitive data
- Securing API endpoints
- Preventing determined bypass

**For production:**
1. **Always validate tokens on your backend**
2. **Use HTTPS in production**
3. **Secure API routes with proper auth middleware**
4. **Never trust client-side data**

---

## 🐛 Troubleshooting

**Issue: Brief flash before redirect**  
Normal behavior. The loader appears, checks auth, then redirects.

**Issue: Redirect loop**  
Don't protect the redirect destination. If redirecting to `/`, don't wrap home page in `ProtectedRoute`.

**Issue: Session not persisting**  
Check browser localStorage. Clear it if corrupted: `localStorage.clear()`

---

**Example:** The `/my-services` page is already protected - try it out!
