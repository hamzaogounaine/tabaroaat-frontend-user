"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Calendar, CheckSquare, Facebook, Chrome, Loader } from "lucide-react" // Added User, Calendar, CheckSquare for new fields
import axios from "axios"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [success , setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "", // Date of Birth
    termsAccepted: false // For the checkbox
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target; // Get type and checked for checkbox
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value, // Handle checkbox checked state
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null)

    // Basic client-side validation (optional, but good practice)
    if (!formData.termsAccepted) {
      setError("يجب الموافقة على الشروط والأحكام للمتابعة.");
      setLoading(false);
      return;
    }
    if(formData.password.length < 6){ // Example: password minimum length
        setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");
        setLoading(false);
        return;
    }

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`, formData, { withCredentials: true });

      if (res.status === 200 || res.status === 201) { // 201 Created is common for registrations
        setSuccess( res.data.message);
        // router.push('/login?registered=true');
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response) {
        setError(err.response.data.message || 'فشل التسجيل. يرجى المحاولة مرة أخرى.');
      } else if (err.request) {
        setError('لا يوجد استجابة من الخادم. يرجى التحقق من اتصالك بالإنترنت.');
      } else {
        setError('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
      }
    } finally {
      setLoading(false);
    }
    console.log("Registration attempt:", formData);
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
          <p className="text-gray-600 mt-2">مرحباً بك في تبرعات!</p> {/* Updated text */}
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">إنشاء حساب جديد</CardTitle> {/* Updated text */}
            <p className="text-gray-600">ادخل بياناتك لإنشاء حساب</p> {/* Updated text */}
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
              {/* First Name Field */}
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-right block">
                  الاسم الأول
                </Label>
                <div className="relative">
                  <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="أدخل اسمك الأول"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="pr-10 text-right"
                    required
                  />
                </div>
              </div>

              {/* Last Name Field */}
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-right block">
                  الاسم الأخير
                </Label>
                <div className="relative">
                  <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="أدخل اسمك الأخير"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="pr-10 text-right"
                    required
                  />
                </div>
              </div>

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
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Date of Birth Field */}
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-right block">
                  تاريخ الميلاد
                </Label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="dob"
                    name="dob"
                    type="date" // Use type="date" for date input
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="pr-10 text-right"
                    required
                  />
                </div>
              </div>

              {/* Terms Accepted Checkbox */}
              <div className="flex items-center space-x-reverse space-x-2">
                <Checkbox
                  id="termsAccepted"
                  name="termsAccepted" // Added name for checkbox
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, termsAccepted: checked }))} // Correct handler
                  required
                />
                <Label htmlFor="termsAccepted" className="text-sm text-gray-600">
                  أوافق على{" "}
                  <Link href="/terms" className="text-red-600 hover:text-red-800">
                    الشروط والأحكام
                  </Link>
                </Label>
              </div>

              {/* Register Button */}
              <Button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white py-2">
                {loading ? <> جار التسجيل <Loader className="animate-spin mr-2" /></> :
                  'إنشاء حساب' /* Updated text */}
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

            {/* Social Login/Register */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full bg-transparent" type="button">
                <Chrome className="ml-2 h-4 w-4" />
                التسجيل بـ Google
              </Button>
              <Button variant="outline" className="w-full bg-transparent" type="button">
                <Facebook className="ml-2 h-4 w-4" />
                التسجيل بـ Facebook
              </Button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                لديك حساب بالفعل؟{" "}
                <Link href="/login" className="text-red-600 hover:text-red-800 font-medium">
                  تسجيل الدخول
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
  )
}