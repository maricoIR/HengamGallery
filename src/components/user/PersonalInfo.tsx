import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import { Icon } from "../ui/Icon";

const PersonalInfo: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null);
  const [imageLoading, setImageLoading] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: "حجم فایل نباید بیشتر از ۵ مگابایت باشد" }));
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "فقط فایل‌های تصویری مجاز هستند" }));
      return;
    }

    setImageLoading(true);
    setErrors((prev) => ({ ...prev, image: "" }));

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileImage(result);
        setImageLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setErrors((prev) => ({ ...prev, image: "خطا در آپلود تصویر" }));
      setImageLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors: Record<string, string> = {};

    if (!passwordData.currentPassword.trim()) {
      newErrors.currentPassword = "رمز عبور فعلی الزامی است";
    }

    if (!passwordData.newPassword.trim()) {
      newErrors.newPassword = "رمز عبور جدید الزامی است";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "رمز عبور جدید باید حداقل ۶ کاراکتر باشد";
    }

    if (!passwordData.confirmPassword.trim()) {
      newErrors.confirmPassword = "تأیید رمز عبور الزامی است";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "رمز عبور جدید و تأیید آن مطابقت ندارند";
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswordForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordChange(false);
      setErrors({});

      // Show success message (you can integrate with toast notifications later)
      alert("رمز عبور با موفقیت تغییر کرد");
    } catch (error) {
      console.error("Error changing password:", error);
      setErrors((prev) => ({ ...prev, general: "خطا در تغییر رمز عبور" }));
    } finally {
      setLoading(false);
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const success = await updateProfile({
        ...formData,
        profileImage: profileImage || undefined,
      });
      if (success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
    setProfileImage(user?.profileImage || null);
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-300">اطلاعات شخصی</h2>
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            icon={<Icon name="edit" size={20} />}
            iconPosition="right">
            ویرایش
          </Button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Icon name="user" size={48} color="#64748b" />
                )}
              </div>
              {imageLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                </div>
              )}
            </div>

            <div className="flex space-x-4 space-x-reverse">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  icon={<Icon name="edit" size={16} />}
                  iconPosition="right">
                  تغییر تصویر
                </Button>
              </label>

              {profileImage && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveImage}
                  icon={<Icon name="trash" size={16} />}
                  iconPosition="right">
                  حذف تصویر
                </Button>
              )}
            </div>

            {errors.image && <p className="text-red-400 text-sm">{errors.image}</p>}
          </div>

          <Input
            label="نام و نام خانوادگی"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            placeholder="نام و نام خانوادگی خود را وارد کنید"
          />

          <Input
            label="ایمیل"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            placeholder="example@email.com"
          />

          <Input
            label="شماره تلفن"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
            placeholder="09123456789"
          />

          <div className="flex space-x-4 space-x-reverse">
            <Button
              type="submit"
              loading={loading}
              icon={<Icon name="checkmark" size={20} />}
              iconPosition="right">
              ذخیره تغییرات
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              icon={<Icon name="close" size={20} />}
              iconPosition="right">
              انصراف
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Profile Image Display */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center">
              {user?.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Icon name="user" size={36} color="#64748b" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 space-x-reverse mb-2">
                <Icon name="user" size={20} className="text-yellow-400" />
                <span className="text-sm text-gray-400">نام و نام خانوادگی</span>
              </div>
              <p className="text-gray-300 font-medium">{user?.name}</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 space-x-reverse mb-2">
                <Icon name="envelope" size={20} className="text-yellow-400" />
                <span className="text-sm text-gray-400">ایمیل</span>
              </div>
              <p className="text-gray-300 font-medium">{user?.email}</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 space-x-reverse mb-2">
                <Icon name="phone" size={20} className="text-yellow-400" />
                <span className="text-sm text-gray-400">شماره تلفن</span>
              </div>
              <p className="text-gray-300 font-medium">{user?.phone}</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center space-x-3 space-x-reverse mb-2">
                <Icon name="calendar" size={20} className="text-yellow-400" />
                <span className="text-sm text-gray-400">تاریخ عضویت</span>
              </div>
              <p className="text-gray-300 font-medium">۱۴۰۳/۰۱/۱۵</p>
            </div>
          </div>

          <div className="bg-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">آمار حساب کاربری</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">۱۲</div>
                <div className="text-sm text-gray-400">تعداد سفارشات</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">۸</div>
                <div className="text-sm text-gray-400">محصولات مورد علاقه</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">۳</div>
                <div className="text-sm text-gray-400">تیکت‌های پشتیبانی</div>
              </div>
            </div>
          </div>

          {/* Password Change Section */}
          <div className="bg-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-300">تغییر رمز عبور</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPasswordChange(!showPasswordChange)}
                icon={<Icon name="edit" size={16} />}
                iconPosition="right">
                {showPasswordChange ? "انصراف" : "تغییر رمز عبور"}
              </Button>
            </div>

            {showPasswordChange && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <Input
                  label="رمز عبور فعلی"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  error={errors.currentPassword}
                  placeholder="رمز عبور فعلی خود را وارد کنید"
                />

                <Input
                  label="رمز عبور جدید"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  error={errors.newPassword}
                  placeholder="رمز عبور جدید خود را وارد کنید"
                />

                <Input
                  label="تأیید رمز عبور جدید"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  error={errors.confirmPassword}
                  placeholder="رمز عبور جدید را دوباره وارد کنید"
                />

                {errors.general && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-red-400 text-sm">{errors.general}</p>
                  </div>
                )}

                <div className="flex space-x-4 space-x-reverse">
                  <Button
                    type="submit"
                    loading={loading}
                    icon={<Icon name="checkmark" size={16} />}
                    iconPosition="right">
                    تغییر رمز عبور
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowPasswordChange(false);
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                      setErrors({});
                    }}>
                    انصراف
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
