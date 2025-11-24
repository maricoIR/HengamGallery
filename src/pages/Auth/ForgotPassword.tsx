import React, { useState } from "react";
import { Input } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("ایمیل الزامی است");
      return;
    }

    if (!validateEmail(email)) {
      setError("فرمت ایمیل صحیح نیست");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      setError("خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-slate-800 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="checkmark-circle" size={32} color="#fff" />
            </div>

            <h1 className="text-2xl font-bold text-gray-300 mb-4">درخواست ارسال شد</h1>

            <p className="text-gray-400 mb-6">
              اگر ایمیل <span className="text-yellow-400 font-medium">{email}</span> در سیستم ما ثبت
              شده باشد، لینک بازنشانی رمز عبور به آن ارسال شده است.
            </p>

            <div className="space-y-4">
              <Button
                onClick={() => (window.location.href = "/login")}
                fullWidth
                icon={<Icon name="arrow-left" size={20} />}
                iconPosition="right">
                بازگشت به ورود
              </Button>

              <p className="text-sm text-gray-500">
                ایمیل دریافت نکرده‌اید؟ پوشه اسپم را بررسی کنید یا{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-yellow-400 hover:text-yellow-300 underline">
                  دوباره تلاش کنید
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-800 rounded-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="key" size={32} color="#0f172a" />
            </div>
            <h1 className="text-2xl font-bold text-gray-300 mb-2">فراموشی رمز عبور</h1>
            <p className="text-gray-400">
              ایمیل خود را وارد کنید تا لینک بازنشانی رمز عبور برای شما ارسال شود
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="ایمیل"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              placeholder="example@email.com"
              required
            />

            <Button
              type="submit"
              loading={isSubmitting}
              fullWidth
              size="lg"
              icon={<Icon name="send" size={20} />}
              iconPosition="right">
              {isSubmitting ? "در حال ارسال..." : "ارسال لینک بازنشانی"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              رمز عبور خود را به یاد آوردید؟{" "}
              <a href="/login" className="text-yellow-400 hover:text-yellow-300 font-medium">
                ورود به حساب کاربری
              </a>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">نکات مهم:</h3>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• لینک بازنشانی فقط ۲۴ ساعت معتبر است</li>
                <li>• اگر ایمیل دریافت نکردید، پوشه اسپم را بررسی کنید</li>
                <li>• برای امنیت بیشتر، لینک فقط یک بار قابل استفاده است</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
