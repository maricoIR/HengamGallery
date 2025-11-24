import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register, loading } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "نام و نام خانوادگی الزامی است";
    }

    if (!formData.email) {
      newErrors.email = "ایمیل الزامی است";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "فرمت ایمیل صحیح نیست";
    }

    if (!formData.phone) {
      newErrors.phone = "شماره تلفن الزامی است";
    } else if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone = "شماره تلفن باید با ۰۹ شروع شود و ۱۱ رقم باشد";
    }

    if (!formData.password) {
      newErrors.password = "رمز عبور الزامی است";
    } else if (formData.password.length < 6) {
      newErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "تکرار رمز عبور الزامی است";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "رمز عبور و تکرار آن یکسان نیستند";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const success = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.phone
      );
      if (success) {
        window.location.href = "/";
      } else {
        setErrors({ general: "خطایی در ثبت نام رخ داد. لطفاً دوباره تلاش کنید" });
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
            ایجاد حساب کاربری
          </h2>
          <p className="mt-2 text-gray-400">
            یا{" "}
            <a href="/login" className="text-yellow-400 hover:text-yellow-300">
              وارد حساب موجود شوید
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
              label="نام و نام خانوادگی"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
              placeholder="نام و نام خانوادگی خود را وارد کنید"
            />

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
              label="شماره تلفن"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={errors.phone}
              placeholder="09123456789"
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

            <Input
              label="تکرار رمز عبور"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              placeholder="رمز عبور را مجدداً وارد کنید"
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="mr-2 block text-sm text-gray-300">
              با{" "}
              <a href="/terms" className="text-yellow-400 hover:text-yellow-300">
                شرایط و قوانین
              </a>{" "}
              موافقم
            </label>
          </div>

          <div>
            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={loading}
              icon={loading ? undefined : <Icon name="user-plus" size={20} />}
              iconPosition="right">
              {loading ? "در حال ثبت نام..." : "ثبت نام"}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              قبلاً ثبت نام کرده‌اید؟{" "}
              <a href="/login" className="text-yellow-400 hover:text-yellow-300 font-medium">
                وارد شوید
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
