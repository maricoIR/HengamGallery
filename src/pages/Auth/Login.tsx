import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login, loading } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "ایمیل الزامی است";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "فرمت ایمیل صحیح نیست";
    }

    if (!formData.password) {
      newErrors.password = "رمز عبور الزامی است";
    } else if (formData.password.length < 6) {
      newErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        window.location.href = "/";
      } else {
        setErrors({ general: "ایمیل یا رمز عبور اشتباه است" });
      }
    } catch (error) {
      setErrors({ general: "خطایی رخ داد. لطفاً دوباره تلاش کنید" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="diamond" size={32} color="#0f172a" />
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow">
            ورود به حساب کاربری
          </h2>
          <p className="mt-2 text-gray-400">
            یا{" "}
            <a href="/register" className="text-yellow-400 hover:text-yellow-300">
              حساب جدید ایجاد کنید
            </a>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-md">
              {errors.general}
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="ایمیل"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              placeholder="example@email.com"
            />

            <Input
              label="رمز عبور"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              placeholder="رمز عبور خود را وارد کنید"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-300">
                مرا به خاطر بسپار
              </label>
            </div>

            <div className="text-sm">
              <a href="/forgot-password" className="text-yellow-400 hover:text-yellow-300">
                فراموشی رمز عبور؟
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={loading}
              icon={loading ? undefined : <Icon name="arrow-left" size={20} />}
              iconPosition="right">
              {loading ? "در حال ورود..." : "ورود"}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              حساب کاربری ندارید؟{" "}
              <a href="/register" className="text-yellow-400 hover:text-yellow-300 font-medium">
                ثبت نام کنید
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
