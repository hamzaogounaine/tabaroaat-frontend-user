// app/reset-password/page.jsx
"use client";

import ResetPasswordForm from "@/components/auth/user/Reser-form";
import { useRouter } from "@/i18n/routing";
import { Suspense } from "react";

// Simulated language switch — ideally this should come from i18n or context

export default function ResetPasswordPage() {
  const { locale } = useRouter();// Change this to 'en' or 'fr' depending on user's language
  
  const messages = {
    ar: "جاري تحميل نموذج إعادة تعيين كلمة السر...",
    en: "Loading reset password form...",
    fr: "Chargement du formulaire de réinitialisation du mot de passe...",
  };
  
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <div
      className="min-h-screen bg-gradient-to-br bg-black/20 flex items-center justify-center p-4"
      dir={dir}
    >
      <Suspense fallback={<div>{messages[currentLang]}</div>}>
        <ResetPasswordForm lang={currentLang} />
      </Suspense>
    </div>
  );
}
