// pages/verify-email.js (Next.js client-side page)
"use client"

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Use next/navigation for App Router
import axios from 'axios';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

export default function VerifyEmailComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('جاري التحقق من بريدك الإلكتروني...');

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      setStatus('error');
      setMessage('الرابط غير مكتمل. يرجى التحقق من الرابط المرسل إليك.');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/verify-email?token=${token}&email=${email}`);
        if (response.status === 200) {
          setStatus('success');
          setMessage('تم تأكيد بريدك الإلكتروني بنجاح! يمكنك الآن تسجيل الدخول.');
          setTimeout(() => {
            router.push('/login'); // Redirect to login page after a delay
          }, 3000);
        }
      } catch (err) {
        console.error('Verification error:', err);
        setStatus('error');
        setMessage(err.response?.data.message || 'حدث خطأ أثناء التحقق من بريدك الإلكتروني. يرجى المحاولة لاحقًا.');
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        {status === 'verifying' && (
          <>
            <Loader className="animate-spin text-blue-500 mx-auto mb-4 h-12 w-12" />
            <h2 className="text-xl font-semibold text-gray-800">{message}</h2>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle className="text-green-500 mx-auto mb-4 h-12 w-12" />
            <h2 className="text-xl font-semibold text-green-700">{message}</h2>
            <p className="mt-4 text-gray-600">سيتم توجيهك إلى صفحة تسجيل الدخول قريبًا...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <XCircle className="text-red-500 mx-auto mb-4 h-12 w-12" />
            <h2 className="text-xl font-semibold text-red-700">{message}</h2>
            <p className="mt-4 text-gray-600">
              إذا استمرت المشكلة، يرجى الاتصال بالدعم.
            </p>
          </>
        )}
      </div>
    </div>
  );
}   