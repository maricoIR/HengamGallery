import React from "react";
import { Icon } from "../components/ui/Icon";
import Button from "../components/ui/Button";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="w-32 h-32 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <Icon name="search" size={64} color="#0f172a" />
        </div>

        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow mb-4">
          ۴۰۴
        </h1>

        <h2 className="text-2xl font-semibold text-gray-300 mb-4">صفحه مورد نظر یافت نشد</h2>

        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا ممکن است حذف شده باشد.
        </p>

        <div className="space-y-4">
          <Button
            onClick={() => (window.location.href = "/")}
            size="lg"
            icon={<Icon name="home" size={20} />}
            iconPosition="right">
            بازگشت به خانه
          </Button>

          <div>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              icon={<Icon name="arrow-right" size={20} />}
              iconPosition="right">
              صفحه قبلی
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-700">
          <p className="text-sm text-gray-500">
            اگر فکر می‌کنید این یک خطا است، لطفاً با ما تماس بگیرید
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
