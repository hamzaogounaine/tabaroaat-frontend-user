"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff, Loader } from "lucide-react";
import axios from "axios";

export default function ResetPasswordForm({ lang }) {
  const t = useTranslations("ResetPassword");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) {
      setToken(urlToken);
    } else {
      setMessage(t("errors.missingToken"));
      setMessageType("error");
    }
  }, [searchParams, t]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setMessageType(null);

    if (!token) {
      setMessage(t("errors.invalidToken"));
      setMessageType("error");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage(t("errors.passwordTooShort"));
      setMessageType("error");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage(t("errors.passwordMismatch"));
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/reset-password/${token}`,
        { password: newPassword, lang: lang || locale }
      );

      if (res.status === 200) {
        setMessage(t("success"));
        setMessageType("success");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => router.push("/login"), 3000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || t("errors.resetFailed"));
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="w-full ">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-green-600">
            {t("brand")}
          </Link>
          <p className="text-gray-600 mt-2">{t("title")}</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">{t("title")}</CardTitle>
            <p className="text-gray-600">{t("subtitle")}</p>
          </CardHeader>

          {message && (
            <div className="px-2">
              <div className={`rounded text-white text-center py-2 ${messageType === "success" ? "bg-green-500" : "bg-green-500"}`}>
                {message}
              </div>
            </div>
          )}

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <PasswordInput
                id="newPassword"
                label={t("newPassword")}
                placeholder={t("newPasswordPlaceholder")}
                value={newPassword}
                onChange={setNewPassword}
                visible={showNewPassword}
                toggleVisible={() => setShowNewPassword((prev) => !prev)}
              />
              <PasswordInput
                id="confirmPassword"
                label={t("confirmPassword")}
                placeholder={t("confirmPasswordPlaceholder")}
                value={confirmPassword}
                onChange={setConfirmPassword}
                visible={showConfirmPassword}
                toggleVisible={() => setShowConfirmPassword((prev) => !prev)}
              />

              <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white py-2">
                {loading ? (
                  <>
                    {t("submitting")} <Loader className="animate-spin mr-2" />
                  </>
                ) : (
                  t("submitButton")
                )}
              </Button>
            </form>

            <div className="text-center mt-4">
              <p className="text-gray-600">
                {t("backToLogin")}{" "}
                <Link href="/login" className="text-green-600 hover:text-green-800 font-medium">
                  {t("login")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 space-y-2">
          <div className="flex justify-center space-x-reverse space-x-4 text-sm text-gray-600">
            <Link href="/privacy" className="hover:text-green-600">
              {t("privacyPolicy")}
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-green-600">
              {t("terms")}
            </Link>
            <span>•</span>
            <Link href="/help" className="hover:text-green-600">
              {t("help")}
            </Link>
          </div>
          <p className="text-xs text-gray-500">{t("rightsReserved")}</p>
        </div>
      </div>
    </div>
  );
}

function PasswordInput({ id, label, placeholder, value, onChange, visible, toggleVisible }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-right block">
        {label}
      </Label>
      <div className="relative">
        <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pr-10 pl-10 text-right"
          required
        />
        <button
          type="button"
          onClick={toggleVisible}
          className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
