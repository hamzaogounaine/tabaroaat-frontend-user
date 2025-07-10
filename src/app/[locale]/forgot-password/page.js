"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl"; // or your i18n hook
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Loader } from "lucide-react";
import axios from "axios";

export default function ForgotPasswordPage() {
  const t = useTranslations("forgotPassword"); // Assuming your JSON has a "ForgotPassword" namespace

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setMessageType(null);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/sendResetPasswordLink`,
        { email }
      );
      if (res.status === 200) {
        setMessage(
          res.data.message || t("success") // Use translation key "success"
        );
        setMessageType("success");
        setEmail("");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || t("error") // Use translation key "error"
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br bg-black/20 flex items-center justify-center p-4"
      dir={t("direction") || "ltr"} // You can add direction in your messages if needed
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-red-600">
            {t("brand") || "تبرعات"}
          </Link>
          <p className="text-gray-600 mt-2">{t("subtitle")}</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {t("title")}
            </CardTitle>
            <p className="text-gray-600">{t("subtitle")}</p>
          </CardHeader>

          {message && (
            <div className="px-2">
              <div
                className={`rounded text-white text-center py-2 ${
                  messageType === "success" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {message}
              </div>
            </div>
          )}

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="block">
                  {t("emailLabel")}
                </Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2"
              >
                {loading ? (
                  <>
                    {t("sending")} <Loader className="animate-spin mr-2" />
                  </>
                ) : (
                  t("sendButton")
                )}
              </Button>
            </form>

            <div className="text-center mt-4">
              <p className="text-gray-600">
                {t("remember")}{" "}
                <Link
                  href="/login"
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  {t("login")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 space-y-2">
          <div className="flex justify-center space-x-reverse space-x-4 text-sm text-gray-600">
            <Link href="/privacy" className="hover:text-red-600">
              {t("privacyPolicy")}
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-red-600">
              {t("termsConditions")}
            </Link>
            <span>•</span>
            <Link href="/help" className="hover:text-red-600">
              {t("help")}
            </Link>
          </div>
          <p className="text-xs text-gray-500">{t("allRightsReserved")}</p>
        </div>
      </div>
    </div>
  );
}
