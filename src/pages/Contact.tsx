import React, { useState } from "react";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Textarea } from "../components/ui/Textarea";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjects = [
    { value: "general", label: "عمومی" },
    { value: "product", label: "سوال درباره محصول" },
    { value: "order", label: "پیگیری سفارش" },
    { value: "warranty", label: "گارانتی" },
    { value: "complaint", label: "شکایت" },
    { value: "suggestion", label: "پیشنهاد" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "نام و نام خانوادگی الزامی است";
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
    if (!formData.subject) newErrors.subject = "انتخاب موضوع الزامی است";
    if (!formData.message.trim()) newErrors.message = "پیام الزامی است";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    alert("پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.");

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow mb-6">
            تماس با ما
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            ما اینجا هستیم تا به سوالات شما پاسخ دهیم و بهترین خدمات را ارائه دهیم
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-300 mb-6">ارسال پیام</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="شماره تلفن"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    placeholder="09123456789"
                  />
                  <Select
                    label="موضوع"
                    options={subjects}
                    value={formData.subject}
                    onChange={(value) => handleSelectChange("subject", value)}
                    placeholder="موضوع پیام را انتخاب کنید"
                  />
                </div>

                <Textarea
                  label="پیام"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  error={errors.message}
                  placeholder="پیام خود را بنویسید..."
                  rows={6}
                />

                <Button
                  type="submit"
                  loading={isSubmitting}
                  size="lg"
                  fullWidth
                  icon={<Icon name="send" size={20} />}
                  iconPosition="right">
                  {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-300 mb-6">اطلاعات تماس</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <Icon name="phone" size={20} className="text-yellow-400 mt-1" />
                  <div>
                    <p className="text-gray-300 font-medium">تلفن</p>
                    <p className="text-gray-400">۰۲۱-۱۲۳۴۵۶۷۸</p>
                    <p className="text-gray-400">۰۹۱۲۳۴۵۶۷۸۹</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <Icon name="envelope" size={20} className="text-yellow-400 mt-1" />
                  <div>
                    <p className="text-gray-300 font-medium">ایمیل</p>
                    <p className="text-gray-400">info@hengamgallery.com</p>
                    <p className="text-gray-400">support@hengamgallery.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <Icon name="map-marker" size={20} className="text-yellow-400 mt-1" />
                  <div>
                    <p className="text-gray-300 font-medium">آدرس</p>
                    <p className="text-gray-400">
                      تهران، خیابان ولیعصر
                      <br />
                      پلاک ۱۲۳، طبقه ۲
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <Icon name="clock" size={20} className="text-yellow-400 mt-1" />
                  <div>
                    <p className="text-gray-300 font-medium">ساعات کاری</p>
                    <p className="text-gray-400">شنبه تا پنج‌شنبه: ۹ صبح تا ۶ عصر</p>
                    <p className="text-gray-400">جمعه: ۱۰ صبح تا ۴ عصر</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-300 mb-6">شبکه‌های اجتماعی</h3>
              <div className="space-y-3">
                <a
                  href="https://instagram.com/hengamgallery"
                  className="flex items-center space-x-3 space-x-reverse text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  <Icon name="instagram" size={20} />
                  <span>@hengamgallery</span>
                </a>
                <a
                  href="https://telegram.me/hengamgallery"
                  className="flex items-center space-x-3 space-x-reverse text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  <Icon name="telegram" size={20} />
                  <span>@hengamgallery</span>
                </a>
                <a
                  href="https://wa.me/989123456789"
                  className="flex items-center space-x-3 space-x-reverse text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  <Icon name="whatsapp" size={20} />
                  <span>واتساپ</span>
                </a>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-300 mb-6">دسترسی سریع</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => (window.location.href = "/faq")}
                  icon={<Icon name="help-circle" size={20} />}
                  iconPosition="right">
                  سوالات متداول
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => (window.location.href = "/shipping")}
                  icon={<Icon name="truck" size={20} />}
                  iconPosition="right">
                  راهنمای ارسال
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => (window.location.href = "/terms")}
                  icon={<Icon name="file-text" size={20} />}
                  iconPosition="right">
                  شرایط و قوانین
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-300 text-center mb-8">موقعیت ما</h2>
          <div className="bg-slate-800 rounded-lg p-8">
            <div className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Icon name="map" size={64} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">نقشه موقعیت گالری هنگام</p>
                <p className="text-sm text-gray-500 mt-2">تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-300 text-center mb-8">سوالات رایج</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-3">
                چگونه می‌توانم سفارش خود را پیگیری کنم؟
              </h3>
              <p className="text-gray-400">
                پس از ثبت سفارش، کد پیگیری برای شما ارسال می‌شود. با استفاده از این کد می‌توانید
                وضعیت سفارش خود را در پنل کاربری مشاهده کنید.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-3">
                آیا امکان بازگشت کالا وجود دارد؟
              </h3>
              <p className="text-gray-400">
                بله، شما می‌توانید تا ۷ روز پس از دریافت کالا، در صورت عدم رضایت، کالا را مرجوع
                نمایید. شرایط کامل در صفحه شرایط و قوانین موجود است.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-3">هزینه ارسال چقدر است؟</h3>
              <p className="text-gray-400">
                برای سفارشات بالای ۵۰ میلیون تومان، ارسال رایگان است. برای سفارشات کمتر، هزینه ارسال
                ۵ میلیون تومان محاسبه می‌شود.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-3">
                آیا محصولات دارای گارانتی هستند؟
              </h3>
              <p className="text-gray-400">
                تمامی محصولات دارای گواهی اصالت و گارانتی سلامت فیزیکی هستند. محصولات طلا و نقره نیز
                دارای ضمانت بازخرید می‌باشند.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/faq")}
              icon={<Icon name="arrow-left" size={20} />}
              iconPosition="right">
              مشاهده تمام سوالات
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
