import React, { useState } from "react";
import { Icon } from "../components/ui/Icon";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "چگونه می‌توانم سفارش دهم؟",
      answer:
        "برای ثبت سفارش، محصول مورد نظر خود را انتخاب کنید، به سبد خرید اضافه کنید و سپس مراحل خرید را تکمیل نمایید. پس از پرداخت، سفارش شما ثبت و برای ارسال آماده می‌شود.",
    },
    {
      question: "زمان تحویل سفارش چقدر است؟",
      answer:
        "زمان تحویل سفارشات بستگی به موقعیت جغرافیایی شما دارد. معمولاً سفارشات در تهران ۲-۳ روز کاری و در شهرستان‌ها ۳-۷ روز کاری تحویل داده می‌شوند.",
    },
    {
      question: "آیا امکان بازگشت کالا وجود دارد؟",
      answer:
        "بله، شما می‌توانید تا ۷ روز پس از دریافت کالا، در صورت عدم رضایت و با داشتن شرایط لازم، کالا را مرجوع نمایید. لطفاً برای کسب اطلاعات بیشتر به صفحه شرایط و قوانین مراجعه کنید.",
    },
    {
      question: "هزینه ارسال چقدر است؟",
      answer:
        "برای سفارشات بالای ۵۰ میلیون تومان، ارسال رایگان است. برای سفارشات کمتر، هزینه ارسال ۵ میلیون تومان محاسبه می‌شود.",
    },
    {
      question: "چگونه از اصالت محصولات اطمینان حاصل کنم؟",
      answer:
        "تمامی محصولات گالری هنگام دارای گواهینامه اصالت هستند و از بهترین مواد اولیه ساخته شده‌اند. همچنین ضمانت بازگشت وجه در صورت عدم تأیید اصالت کالا را داریم.",
    },
    {
      question: "روش‌های پرداخت چیست؟",
      answer:
        "شما می‌توانید از طریق درگاه پرداخت اینترنتی با تمامی کارت‌های عضو شتاب، پرداخت نمایید. همچنین امکان پرداخت نقدی در محل نیز وجود دارد.",
    },
    {
      question: "آیا امکان سفارش شخصی‌سازی شده وجود دارد؟",
      answer:
        "بله، ما امکان طراحی و ساخت محصولات شخصی‌سازی شده را فراهم می‌کنیم. برای این منظور لطفاً با پشتیبانی ما تماس بگیرید.",
    },
    {
      question: "چگونه می‌توانم سفارش خود را پیگیری کنم؟",
      answer:
        "پس از ثبت سفارش، یک کد پیگیری برای شما ارسال می‌شود. با استفاده از این کد در بخش پروفایل کاربری یا تماس با پشتیبانی، می‌توانید وضعیت سفارش خود را مشاهده کنید.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow mb-4">
            سوالات متداول
          </h1>
          <p className="text-gray-400">پاسخ سوالات رایج درباره خرید، ارسال و خدمات گالری هنگام</p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-slate-800 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-right hover:bg-slate-700 transition-colors duration-200">
                <span className="text-lg font-medium text-gray-300">{item.question}</span>
                <Icon
                  name={openIndex === index ? "chevron-up" : "chevron-down"}
                  size={20}
                  className="text-yellow-400"
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-slate-750 border-t border-slate-700">
                  <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-slate-800 rounded-lg p-8 text-center">
          <Icon name="headphone" size={48} className="text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">سوال دیگری دارید؟</h3>
          <p className="text-gray-400 mb-6">تیم پشتیبانی ما آماده پاسخگویی به سوالات شماست</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:02112345678"
              className="flex items-center justify-center space-x-2 space-x-reverse text-yellow-400 hover:text-yellow-300">
              <Icon name="phone" size={20} />
              <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
            </a>
            <a
              href="mailto:info@hengamgallery.com"
              className="flex items-center justify-center space-x-2 space-x-reverse text-yellow-400 hover:text-yellow-300">
              <Icon name="envelope" size={20} />
              <span>info@hengamgallery.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
