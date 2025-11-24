import React from "react";

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow mb-8">
          شرایط و قوانین
        </h1>

        <div className="space-y-8 text-gray-300">
          <section className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">۱. کلیات</h2>
            <p className="text-gray-400 leading-relaxed">
              با استفاده از خدمات گالری هنگام، شما با تمامی شرایط و قوانین ذکر شده در این صفحه
              موافقت می‌کنید. لطفاً قبل از خرید، این شرایط را به دقت مطالعه نمایید.
            </p>
          </section>

          <section className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">۲. ثبت سفارش و پرداخت</h2>
            <ul className="space-y-2 text-gray-400 leading-relaxed list-disc list-inside">
              <li>تمامی قیمت‌ها به تومان و شامل مالیات بر ارزش افزوده است</li>
              <li>پرداخت از طریق درگاه‌های معتبر بانکی انجام می‌شود</li>
              <li>پس از پرداخت موفق، شماره پیگیری برای شما ارسال می‌شود</li>
              <li>در صورت عدم موجودی، مبلغ پرداختی تا ۷۲ ساعت بازگردانده می‌شود</li>
            </ul>
          </section>

          <section className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">۳. ارسال و تحویل</h2>
            <ul className="space-y-2 text-gray-400 leading-relaxed list-disc list-inside">
              <li>زمان تحویل برای تهران ۲-۳ روز کاری و برای شهرستان‌ها ۳-۷ روز کاری است</li>
              <li>هزینه ارسال برای سفارشات بالای ۵۰ میلیون تومان رایگان است</li>
              <li>ارسال به تمام نقاط کشور امکان‌پذیر است</li>
              <li>مسئولیت محصول تا زمان تحویل به مشتری بر عهده گالری هنگام است</li>
            </ul>
          </section>

          <section className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">۴. گارانتی و ضمانت</h2>
            <ul className="space-y-2 text-gray-400 leading-relaxed list-disc list-inside">
              <li>تمامی محصولات دارای گواهی اصالت هستند</li>
              <li>محصولات طلا و نقره دارای ضمانت بازخرید هستند</li>
              <li>خدمات پس از فروش شامل تعمیر و نگهداری است</li>
              <li>گارانتی سلامت فیزیکی محصول برای ۶ ماه</li>
            </ul>
          </section>

          <section className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
              ۵. بازگشت کالا و استرداد وجه
            </h2>
            <ul className="space-y-2 text-gray-400 leading-relaxed list-disc list-inside">
              <li>امکان بازگشت کالا تا ۷ روز پس از تحویل</li>
              <li>محصول باید در شرایط اولیه و با بسته‌بندی کامل باشد</li>
              <li>هزینه ارسال بازگشتی به عهده خریدار است</li>
              <li>بازگشت وجه تا ۷۲ ساعت پس از دریافت کالا انجام می‌شود</li>
              <li>کالاهای سفارشی قابل بازگشت نیستند</li>
            </ul>
          </section>

          <section className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">۶. حریم خصوصی</h2>
            <p className="text-gray-400 leading-relaxed">
              گالری هنگام متعهد به حفظ اطلاعات شخصی کاربران است. اطلاعات شما تنها برای پردازش
              سفارشات استفاده می‌شود و با هیچ شخص ثالثی به اشتراک گذاشته نمی‌شود.
            </p>
          </section>

          <section className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">۷. تغییرات در قوانین</h2>
            <p className="text-gray-400 leading-relaxed">
              گالری هنگام حق تغییر و به‌روزرسانی این شرایط را بدون اطلاع قبلی دارد. توصیه می‌شود به
              طور مرتب این صفحه را بررسی کنید.
            </p>
          </section>

          <section className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">۸. تماس با ما</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              در صورت داشتن هرگونه سوال یا ابهام درباره شرایط و قوانین، با ما تماس بگیرید:
            </p>
            <div className="space-y-2 text-gray-400">
              <p>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
              <p>ایمیل: info@hengamgallery.com</p>
              <p>آدرس: تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
