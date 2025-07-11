"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Calendar,
  Facebook,
  Chrome,
  Loader,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";

export default function RegisterPage() {
  const locale = useLocale();
  const t = useTranslations("Register");
  const isRTL = locale === "ar";

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    termsAccepted: false,
    lang : locale
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!formData.termsAccepted) {
      setError(t("errors.termsRequired"));
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError(t("errors.passwordLength"));
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`,
        formData ,
        { withCredentials: true }
      );

      if (res.status === 200 || res.status === 201) {
        setSuccess(res.data.message);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || t("errors.registerFailed"));
      } else if (err.request) {
        setError(t("errors.noServer"));
      } else {
        setError(t("errors.unexpected"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br bg-black/20 flex items-center justify-center p-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-red-600">
            {t("brand")}
          </Link>
          <p className="text-gray-600 mt-2">{t("welcome")}</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">{t("title")}</CardTitle>
            <p className="text-gray-600">{t("subtitle")}</p>
          </CardHeader>

          {error && (
            <div className="px-2">
              <div className="rounded bg-red-500 text-white text-center py-1">
                {error}
              </div>
            </div>
          )}
          {success && (
            <div className="px-2">
              <div className="rounded bg-green-500 text-white text-center py-1">
                {success}
              </div>
            </div>
          )}

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputGroup
                id="firstName"
                label={t("firstName")}
                icon={<User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />}
                type="text"
                value={formData.firstName}
                placeholder={t("firstNamePlaceholder")}
                onChange={handleInputChange}
              />

              <InputGroup
                id="lastName"
                label={t("lastName")}
                icon={<User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />}
                type="text"
                value={formData.lastName}
                placeholder={t("lastNamePlaceholder")}
                onChange={handleInputChange}
              />

              <InputGroup
                id="email"
                label={t("email")}
                icon={<Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />}
                type="email"
                value={formData.email}
                placeholder={t("emailPlaceholder")}
                onChange={handleInputChange}
              />

              <div className="space-y-2">
                <Label htmlFor="password" className="block text-right">
                  {t("password")}
                </Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("passwordPlaceholder")}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pr-10 pl-10 text-right"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <InputGroup
                id="dob"
                label={t("dob")}
                icon={<Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />}
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
              />

              <div className="flex items-center space-x-reverse space-x-2">
                <Checkbox
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, termsAccepted: checked }))
                  }
                  required
                />
                <Label htmlFor="termsAccepted" className="text-sm text-gray-600">
                  {t("agreeTo")}{" "}
                  <Link href="/terms" className="text-red-600 hover:text-red-800">
                    {t("terms")}
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2"
              >
                {loading ? (
                  <>
                    {t("loading")} <Loader className="animate-spin mr-2" />
                  </>
                ) : (
                  t("submitButton")
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">{t("or")}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full bg-transparent" type="button">
                <Chrome className="ml-2 h-4 w-4" />
                {t("registerWithGoogle")}
              </Button>
              <Button variant="outline" className="w-full bg-transparent" type="button">
                <Facebook className="ml-2 h-4 w-4" />
                {t("registerWithFacebook")}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-gray-600">
                {t("alreadyHaveAccount")} {" "}
                <Link href="/login" className="text-red-600 hover:text-red-800 font-medium">
                  {t("login")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 space-y-2">
          <div className="flex justify-center space-x-reverse space-x-4 text-sm text-gray-600">
            <Link href="/privacy" className="hover:text-red-600">
              {t("privacy")}
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-red-600">
              {t("terms")}
            </Link>
            <span>•</span>
            <Link href="/help" className="hover:text-red-600">
              {t("help")}
            </Link>
          </div>
          <p className="text-xs text-gray-500">© 2024 {t("rightsReserved")}</p>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ id, label, icon, type, value, placeholder, onChange }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-right block">
        {label}
      </Label>
      <div className="relative">
        {icon}
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="pr-10 text-right"
          required
        />
      </div>
    </div>
  );
}
