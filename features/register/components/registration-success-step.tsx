"use client";

import { SignInDialog } from "@/features/auth/components/sign-in/sign-in-dialog";
import { useSignInDialog } from "@/features/auth/hooks/use-sign-in-dialog";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { CheckCircleIcon } from "@/components/icon/CheckCircleIcon";

export function RegistrationSuccessStep() {
  const t = useTranslations("register-page.success");
  const router = useRouter();
  const { isSignInDialogOpen, setIsSignInDialogOpen } = useSignInDialog();

  return (
    <div className="flex flex-col gap-14 items-center w-full py-10 text-center">
      <div className="flex flex-col gap-6 items-center w-full">
        <CheckCircleIcon size={80} color="#22C55E" />
        <div className="flex flex-col gap-2 items-center w-full">
          <h2 className="text-[#384250] font-bold text-base">{t("title")}</h2>
          <p className="text-[#6c737f] text-base max-w-lg">
            {t("description")}
          </p>
        </div>
      </div>

      <div className="flex gap-6 items-center">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="bg-[#f3f4f6] px-5 py-3 h-12 rounded-xl text-[#384250] font-semibold text-base"
        >
          {t("goHome")}
        </button>
        <button
          type="button"
          onClick={() => setIsSignInDialogOpen(true)}
          className="bg-[#111927] px-5 py-3 h-12 rounded-xl text-white font-semibold text-base"
        >
          {t("signIn")}
        </button>
      </div>

      <SignInDialog
        isAtTop={false}
        open={isSignInDialogOpen}
        onOpenChange={setIsSignInDialogOpen}
      />
    </div>
  );
}
