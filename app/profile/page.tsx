"use client";

import { ProtectedRoute } from "@/features/auth/components/routing/protected-route";
import { useAuth } from "@/features/auth/contexts/auth.context";
import { PersonalInformationForm } from "@/features/profile/components/personal-information-form";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { SecurityForm } from "@/features/profile/components/security-form";

export default function Page() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <ProfileHeader />
      <PersonalInformationForm
        initialValues={{
          name: user?.name,
          lastName: user?.lastName,
          email: user?.email,
        }}
        className="mb-10"
      />
      <SecurityForm />
    </ProtectedRoute>
  );
}
