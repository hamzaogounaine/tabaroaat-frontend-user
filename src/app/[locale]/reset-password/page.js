// app/reset-password/page.jsx (or whatever your page file is called)
"use client"; // Keep this on the page if you have other client-side logic on the page itself

import ResetPasswordForm from "@/components/auth/user/Reser-form";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br bg-black/20 flex items-center justify-center p-4"
      dir="rtl"
    >
      {/* Wrap the client component in Suspense */}
      <Suspense fallback={<div>Loading reset password form...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}