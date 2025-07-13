"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Facebook,
  Chrome,
  Loader,
} from "lucide-react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations("Login");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const isRtl = locale === "ar";

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    lang : locale
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    // Basic example, often needs more attributes for production
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax; Secure";
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
        formData,
        { withCredentials: true }
      );

      if (res.data && res.data.requiresVerificationCode === true) {
        sessionStorage.setItem("deviceVerificationEmail", res.data.email);
        router.push("/verify-device");
      } else if (res.status === 200 || res.status === 201) {
        console.log(res.data.token)
        setCookie('token' , res.data.token , 1)
        router.push(redirectTo);

      } else {
        console.log("Unhandled successful response:", res);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || t("loginFailed"));
      } else if (err.request) {
        setError(t("noServerResponse"));
      } else {
        setError(t("unexpectedError"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br bg-black/20 flex items-center justify-center p-4"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8" style={{ direction: isRtl ? "rtl" : "ltr" }}>
          <Link href="/" className="text-3xl font-bold text-green-600">
            {t("title")}
          </Link>
          <p className="text-gray-600 mt-2">{t("welcomeBack")}</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center" style={{ direction: isRtl ? "rtl" : "ltr" }}>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {t("loginTitle")}
            </CardTitle>
            <p className="text-gray-600">{t("loginSubtitle")}</p>
          </CardHeader>

          {error && (
            <div className="px-2">
              <div className="rounded bg-green-500 text-white text-center py-1 text-sm">
                {error}
              </div>
            </div>
          )}

          <CardContent className="space-y-6" style={{ direction: isRtl ? "rtl" : "ltr" }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className={`block ${isRtl ? "text-right" : "text-left"}`}>
                  {t("emailLabel")}
                </Label>
                <div className="relative">
                  <Mail className={`absolute ${isRtl ? "right-3" : "left-3"} top-3 h-4 w-4 text-gray-400`} />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${isRtl ? "pr-10 text-right" : "pl-10 text-left"}`}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className={`block ${isRtl ? "text-right" : "text-left"}`}>
                  {t("passwordLabel")}
                </Label>
                <div className="relative">
                  <Lock className={`absolute ${isRtl ? "right-3" : "left-3"} top-3 h-4 w-4 text-gray-400`} />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("passwordPlaceholder")}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`${isRtl ? "pr-10 pl-10 text-right" : "pl-10 pr-10 text-left"}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${isRtl ? "left-3" : "right-3"} top-3 text-gray-400 hover:text-gray-600`}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className={`flex items-center justify-between ${isRtl ? "space-x-reverse" : ""}`}>
                <div className={`flex items-center space-x-2 ${isRtl ? "space-x-reverse" : ""}`}>
                  <Checkbox
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, rememberMe: checked }))
                    }
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                    {t("rememberMe")}
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-green-600 hover:text-green-800"
                >
                  {t("forgotPassword")}
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2"
              >
                {loading ? (
                  <>
                    {t("loggingIn")} <Loader className="animate-spin" />
                  </>
                ) : (
                  t("loginButton")
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">{t("or")}</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full bg-transparent" type="button">
                <Chrome className="ml-2 h-4 w-4" />
                {t("loginWithGoogle")}
              </Button>
              <Button variant="outline" className="w-full bg-transparent" type="button">
                <Facebook className="ml-2 h-4 w-4" />
                {t("loginWithFacebook")}
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center" style={{ direction: isRtl ? "rtl" : "ltr" }}>
              <p className="text-gray-600">
                {t("noAccount")}{" "}
                <Link
                  href="/signup"
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  {t("signUp")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div
          className="text-center mt-8 space-y-2"
          style={{ direction: isRtl ? "rtl" : "ltr" }}
        >
          <div
            className={`flex justify-center space-x-4 text-sm text-gray-600 ${
              isRtl ? "space-x-reverse" : ""
            }`}
          >
            <Link href="/privacy" className="hover:text-green-600">
              {t("privacyPolicy")}
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-green-600">
              {t("termsConditions")}
            </Link>
            <span>•</span>
            <Link href="/help" className="hover:text-green-600">
              {t("help")}
            </Link>
          </div>
          <p className="text-xs text-gray-500">{t("allRightsReserved")}</p>
        </div>
      </div>
    </div>
  );
}
