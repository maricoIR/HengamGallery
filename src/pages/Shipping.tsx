import React from "react";
import { Icon } from "../components/ui/Icon";

const Shipping: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow mb-8">
          راهنمای ارسال
        </h1>

        <div className="space-y-6">
          <section className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <Icon name="truck" size={32} className="text-yellow-400" />
              <h2 className="text-2xl font-semibold text-gray-300">روش‌های ارسال</h2>
            </div>
            <div className="space-y-4 text-gray-400">
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">ارسال عادی</h3>
                <p className="mb-2">زمان تحویل: ۳-۷ روز کاری</p>
                <p>هزینه: ۵ میلیون تومان (رایگان برای خریدهای بالای ۵۰ میلیون تومان)</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">ارسال سریع</h3>
                <p className="mb-2">زمان تحویل: ۱-۲ روز کاری</p>
                <p>هزینه: ۱۰ میلیون تومان</p>
              </div>
            </div>
          </section>

          <section className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <Icon name="map-marker" size={32} className="text-yellow-400" />
              <h2 className="text-2xl font-semibold text-gray-300">محدوده ارسال</h2>
            </div>
            <p className="text-gray-400 mb-4">
              ارسال به تمام نقاط ایران امکان‌پذیر است. زمان تحویل بسته به موقعیت جغرافیایی متفاوت
              است:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">تهران</h3>
                <p className="text-gray-400">۲-۳ روز کاری</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">کلان‌شهرها</h3>
                <p className="text-gray-400">۳-۵ روز کاری</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">سایر شهرها</h3>
                <p className="text-gray-400">۵-۷ روز کاری</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">مناطق دورافتاده</h3>
                <p className="text-gray-400">۷-۱۰ روز کاری</p>
              </div>
            </div>
          </section>

          <section className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <Icon name="package" size={32} className="text-yellow-400" />
              <h2 className="text-2xl font-semibold text-gray-300">بسته‌بندی</h2>
            </div>
            <p className="text-gray-400">
              تمامی محصولات با بسته‌بندی مخصوص و ایمن ارسال می‌شوند. بسته‌بندی شامل:
            </p>
            <ul className="mt-4 space-y-2 text-gray-400 list-disc list-inside">
              <li>جعبه مقاوم و ضد ضربه</li>
              <li>پوشش حفاظتی داخلی</li>
              <li>گواهی اصالت محصول</li>
              <li>کارت گارانتی</li>
              <li>راهنمای نگهداری</li>
            </ul>
          </section>

          <section className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <Icon name="checkmark-circle" size={32} className="text-yellow-400" />
              <h2 className="text-2xl font-semibold text-gray-300">پیگیری مرسوله</h2>
            </div>
            <p className="text-gray-400 mb-4">
              پس از ارسال محصول، کد رهگیری برای شما پیامک می‌شود. شما می‌توانید از طریق:
            </p>
            <ul className="space-y-2 text-gray-400 list-disc list-inside">
              <li>پنل کاربری خود در سایت</li>
              <li>تماس با پشتیبانی</li>
              <li>پیامک وضعیت بسته</li>
            </ul>
            <p className="text-gray-400 mt-4">وضعیت مرسوله خود را به صورت لحظه‌ای پیگیری کنید.</p>
          </section>

          <section className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <Icon name="shield-check" size={32} className="text-yellow-400" />
              <h2 className="text-2xl font-semibold text-gray-300">بیمه مرسوله</h2>
            </div>
            <p className="text-gray-400">
              تمامی مرسولات دارای بیمه کامل هستند. در صورت هرگونه آسیب در حین ارسال، مسئولیت به عهده
              گالری هنگام است و محصول جایگزین یا مبلغ کامل به شما بازگردانده می‌شود.
            </p>
          </section>

          <section className="bg-slate-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <Icon name="information" size={32} className="text-yellow-400" />
              <h2 className="text-2xl font-semibold text-gray-300">نکات مهم</h2>
            </div>
            <ul className="space-y-2 text-gray-400 list-disc list-inside">
              <li>حتماً در زمان تحویل، بسته را در حضور پیک بررسی کنید</li>
              <li>در صورت مشاهده هرگونه آسیب، از تحویل گرفتن خودداری کنید</li>
              <li>رسید تحویل را حتماً نگهداری کنید</li>
              <li>در ایام تعطیلی، زمان ارسال ممکن است طولانی‌تر شود</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
