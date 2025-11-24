import React from "react";
import { Icon } from "../components/ui/Icon";
import Button from "../components/ui/Button";

const OrderSuccess: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <Icon name="checkmark-circle" size={64} color="#fff" />
        </div>

        <h1 className="text-3xl font-bold text-gray-300 mb-4">سفارش شما با موفقیت ثبت شد</h1>

        <p className="text-gray-400 mb-2">
          شماره پیگیری: <span className="text-yellow-400 font-bold">۱۲۳۴۵۶۷۸۹۰</span>
        </p>

        <p className="text-gray-400 mb-8">
          سفارش شما با موفقیت ثبت شد و به زودی برای ارسال آماده می‌شود. اطلاعات پیگیری سفارش به
          ایمیل و شماره تلفن شما ارسال شد.
        </p>

        <div className="bg-slate-800 rounded-lg p-6 mb-8 text-right">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">مراحل بعدی</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 space-x-reverse">
              <Icon name="checkmark" size={20} className="text-green-400 mt-1" />
              <div className="text-sm text-gray-400">سفارش شما در حال بررسی و تایید است</div>
            </div>
            <div className="flex items-start space-x-3 space-x-reverse">
              <Icon name="package" size={20} className="text-yellow-400 mt-1" />
              <div className="text-sm text-gray-400">بسته‌بندی و آماده‌سازی برای ارسال</div>
            </div>
            <div className="flex items-start space-x-3 space-x-reverse">
              <Icon name="truck" size={20} className="text-blue-400 mt-1" />
              <div className="text-sm text-gray-400">ارسال توسط پیک به آدرس شما</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => (window.location.href = "/")}
            size="lg"
            fullWidth
            icon={<Icon name="home" size={20} />}
            iconPosition="right">
            بازگشت به صفحه اصلی
          </Button>

          <Button
            variant="outline"
            onClick={() => (window.location.href = "/profile")}
            fullWidth
            icon={<Icon name="receipt" size={20} />}
            iconPosition="right">
            مشاهده سفارش
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
