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
import { redirect, RedirectType, useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        // Check if the response indicates a need for device verification
        if (res.data && res.data.requiresVerificationCode === true) {
          console.log('New device/IP detected, redirecting for verification.');
          sessionStorage.setItem('deviceVerificationEmail' , res.data.email)
          router.push("/verify-device");
        }
        // Only proceed to full login if there's no pending verification code AND status is 200/201
        else if (res.status === 200 || res.status === 201) {
          console.log('Login successful!', res);
          // At this point, the server has issued a JWT and set the cookie
          // You might also want to save user details to a global state/context here
          router.push("/"); // Redirect to the main dashboard/homepage
        } else {
          // Handle other successful but non-login statuses if any, or general success
          console.log('Unhandled successful response:', res);
        }
    })
    
      .catch((err) => {
        if (err.response) {
          setError(
            err.response.data.message || "فشل التسجيل. يرجى المحاولة مرة أخرى."
          );
        } else if (err.request) {
          setError(
            "لا يوجد استجابة من الخادم. يرجى التحقق من اتصالك بالإنترنت."
          );
        } else {
          setError("حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.");
        }
      })
      .finally(() => setLoading(false));
    console.log("Login attempt:", formData);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br bg-black/20 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-red-600">
            تبرعات
          </Link>
          <p className="text-gray-600 mt-2">مرحباً بك مرة أخرى</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              تسجيل الدخول
            </CardTitle>
            <p className="text-gray-600">ادخل بياناتك للوصول إلى حسابك</p>
          </CardHeader>
          {error && (
            <div className="px-2">
              <div className="rounded bg-red-500 text-white text-center py-1 text-sm">
                {error}
              </div>
            </div>
          )}
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-right block">
                  البريد الإلكتروني
                </Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pr-10 text-right"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-right block">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور"
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-reverse space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, rememberMe }))
                    }
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                    تذكرني
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2"
              >
                {loading ? (
                  <>
                    {" "}
                    جار التسجيل <Loader className="animate-spin" />
                  </>
                ) : (
                  "تسجيل الدخول"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">أو</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                type="button"
              >
                <Chrome className="ml-2 h-4 w-4" />
                تسجيل الدخول بـ Google
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                type="button"
              >
                <Facebook className="ml-2 h-4 w-4" />
                تسجيل الدخول بـ Facebook
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-600">
                ليس لديك حساب؟{" "}
                <Link
                  href="/signup"
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  إنشاء حساب جديد
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="text-center mt-8 space-y-2">
          <div className="flex justify-center space-x-reverse space-x-4 text-sm text-gray-600">
            <Link href="/privacy" className="hover:text-red-600">
              سياسة الخصوصية
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-red-600">
              الشروط والأحكام
            </Link>
            <span>•</span>
            <Link href="/help" className="hover:text-red-600">
              المساعدة
            </Link>
          </div>
          <p className="text-xs text-gray-500">© 2024 جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
}
