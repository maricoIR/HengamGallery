import React, { useState } from "react";
import { Icon } from "../components/ui/Icon";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";

interface TrackingStep {
  id: number;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  date?: string;
  time?: string;
}

const OrderTracking: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingStep[] | null>(null);
  const [error, setError] = useState("");

  const mockTrackingSteps: TrackingStep[] = [
    {
      id: 1,
      title: "سفارش ثبت شد",
      description: "سفارش شما با موفقیت ثبت و پردازش شد",
      status: "completed",
      date: "۱۴۰۳/۰۱/۱۵",
      time: "۱۴:۳۰",
    },
    {
      id: 2,
      title: "تأیید پرداخت",
      description: "پرداخت شما تأیید و سفارش آماده ارسال شد",
      status: "completed",
      date: "۱۴۰۳/۰۱/۱۵",
      time: "۱۵:۴۵",
    },
    {
      id: 3,
      title: "آماده‌سازی سفارش",
      description: "محصولات شما در حال بسته‌بندی و آماده‌سازی است",
      status: "completed",
      date: "۱۴۰۳/۰۱/۱۶",
      time: "۰۹:۱۵",
    },
    {
      id: 4,
      title: "ارسال شده",
      description: "سفارش شما از انبار ارسال شد",
      status: "current",
      date: "۱۴۰۳/۰۱/۱۶",
      time: "۱۱:۲۰",
    },
    {
      id: 5,
      title: "در راه",
      description: "سفارش شما در حال انتقال به آدرس شما است",
      status: "pending",
    },
    {
      id: 6,
      title: "تحویل داده شد",
      description: "سفارش شما با موفقیت تحویل داده شد",
      status: "pending",
    },
  ];

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsTracking(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (orderNumber === "12345" && phoneNumber === "09123456789") {
        setTrackingData(mockTrackingSteps);
      } else {
        setError("سفارشی با این اطلاعات یافت نشد. لطفاً شماره سفارش و تلفن همراه را بررسی کنید.");
      }
    } catch (error) {
      setError("خطا در دریافت اطلاعات سفارش. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsTracking(false);
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Icon name="checkmark-circle" size={24} color="#10b981" />;
      case "current":
        return <Icon name="clock" size={24} color="#f59e0b" />;
      default:
        return <Icon name="circle" size={24} color="#6b7280" />;
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-500 bg-green-500/10";
      case "current":
        return "border-yellow-500 bg-yellow-500/10";
      default:
        return "border-gray-500 bg-gray-500/10";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow mb-4">
            پیگیری سفارش
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            برای پیگیری سفارش خود، شماره سفارش و شماره تلفن همراه ثبت شده را وارد کنید
          </p>
        </div>

        {!trackingData ? (
          <div className="bg-slate-800 rounded-lg p-8">
            <form onSubmit={handleTrackOrder} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="شماره سفارش"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="مثال: ۱۲۳۴۵"
                  required
                />
                <Input
                  label="شماره تلفن همراه"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-center">
                    <Icon name="close-circle" size={20} color="#ef4444" className="ml-2" />
                    <p className="text-red-400">{error}</p>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                loading={isTracking}
                fullWidth
                size="lg"
                icon={<Icon name="search" size={20} />}
                iconPosition="right">
                {isTracking ? "در حال جستجو..." : "پیگیری سفارش"}
              </Button>
            </form>

            <div className="mt-8 p-6 bg-slate-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-300 mb-4">راهنمای پیگیری سفارش</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start">
                  <Icon name="information" size={16} className="text-yellow-400 mt-1 ml-2" />
                  <p>شماره سفارش را از ایمیل تأیید سفارش یا پیامک دریافت خواهید کرد</p>
                </div>
                <div className="flex items-start">
                  <Icon name="information" size={16} className="text-yellow-400 mt-1 ml-2" />
                  <p>شماره تلفن همراه باید همان شماره‌ای باشد که در زمان ثبت سفارش وارد کرده‌اید</p>
                </div>
                <div className="flex items-start">
                  <Icon name="information" size={16} className="text-yellow-400 mt-1 ml-2" />
                  <p>در صورت بروز مشکل، با پشتیبانی تماس بگیرید</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-300">خلاصه سفارش</h2>
                <span className="text-sm text-gray-400">شماره سفارش: {orderNumber}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Icon name="package" size={20} className="text-yellow-400 ml-2" />
                    <span className="text-sm text-gray-400">تعداد محصولات</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-300">۳ محصول</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Icon name="receipt" size={20} className="text-yellow-400 ml-2" />
                    <span className="text-sm text-gray-400">مبلغ کل</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-300">۲,۵۰۰,۰۰۰ تومان</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Icon name="truck" size={20} className="text-yellow-400 ml-2" />
                    <span className="text-sm text-gray-400">روش ارسال</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-300">پست پیشتاز</p>
                </div>
              </div>
            </div>

            {/* Tracking Steps */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-300 mb-6">وضعیت سفارش</h2>
              <div className="space-y-6">
                {trackingData.map((step, index) => (
                  <div key={step.id} className="flex items-start">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${getStepColor(
                        step.status
                      )}`}>
                      {getStepIcon(step.status)}
                    </div>
                    <div className="mr-4 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3
                          className={`text-lg font-medium ${
                            step.status === "completed"
                              ? "text-green-400"
                              : step.status === "current"
                              ? "text-yellow-400"
                              : "text-gray-400"
                          }`}>
                          {step.title}
                        </h3>
                        {step.date && (
                          <span className="text-sm text-gray-500">
                            {step.date} - {step.time}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                    {index < trackingData.length - 1 && (
                      <div className="absolute right-6 top-12 w-0.5 h-16 bg-gray-600"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => {
                  setTrackingData(null);
                  setOrderNumber("");
                  setPhoneNumber("");
                  setError("");
                }}
                variant="outline"
                fullWidth
                icon={<Icon name="search" size={20} />}
                iconPosition="right">
                پیگیری سفارش دیگر
              </Button>
              <Button
                onClick={() => (window.location.href = "/contact")}
                fullWidth
                icon={<Icon name="headphone" size={20} />}
                iconPosition="right">
                تماس با پشتیبانی
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
