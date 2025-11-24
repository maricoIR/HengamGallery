import React from "react";
import { Icon } from "../components/ui/Icon";
import Button from "../components/ui/Button";

const OrderFailed: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <Icon name="close-circle" size={64} color="#fff" />
        </div>

        <h1 className="text-3xl font-bold text-gray-300 mb-4">خطا در ثبت سفارش</h1>

        <p className="text-gray-400 mb-8">
          متأسفانه در فرآیند ثبت سفارش خطایی رخ داد. لطفاً دوباره تلاش کنید. در صورت تکرار مشکل، با
          پشتیبانی تماس بگیرید.
        </p>

        <div className="bg-slate-800 rounded-lg p-6 mb-8 text-right">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">دلایل احتمالی</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-start space-x-2 space-x-reverse">
              <span className="text-red-400">•</span>
              <span>اتصال به اینترنت قطع شده است</span>
            </div>
            <div className="flex items-start space-x-2 space-x-reverse">
              <span className="text-red-400">•</span>
              <span>اطلاعات پرداخت نادرست است</span>
            </div>
            <div className="flex items-start space-x-2 space-x-reverse">
              <span className="text-red-400">•</span>
              <span>موجودی کافی در حساب وجود ندارد</span>
            </div>
            <div className="flex items-start space-x-2 space-x-reverse">
              <span className="text-red-400">•</span>
              <span>خطای موقت در سیستم پرداخت</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => (window.location.href = "/checkout")}
            size="lg"
            fullWidth
            icon={<Icon name="refresh" size={20} />}
            iconPosition="right">
            تلاش مجدد
          </Button>

          <Button
            variant="outline"
            onClick={() => (window.location.href = "/cart")}
            fullWidth
            icon={<Icon name="shopping-cart" size={20} />}
            iconPosition="right">
            بازگشت به سبد خرید
          </Button>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-sm text-gray-500 mb-3">نیاز به کمک دارید؟</p>
            <Button
              variant="ghost"
              onClick={() => (window.location.href = "/support")}
              icon={<Icon name="headphone" size={16} />}
              iconPosition="right">
              تماس با پشتیبانی
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFailed;
