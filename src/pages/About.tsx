import React from "react";
import { Icon } from "../components/ui/Icon";
import Button from "../components/ui/Button";

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow mb-6">
            درباره گالری هنگام
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            بیش از سه دهه تجربه در طراحی و ساخت جواهرات منحصر به فرد با بالاترین کیفیت و اصالت
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-300 mb-6">داستان ما</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                گالری هنگام در سال ۱۳۷۰ با هدف ارائه بهترین جواهرات دست‌ساز ایرانی تأسیس شد. ما
                معتقدیم که هر قطعه جواهر باید داستان خاص خود را داشته باشد و یادگاری ارزشمند برای
                نسل‌های آینده باشد.
              </p>
              <p>
                با بیش از ۳۰ سال تجربه در صنعت جواهرات، تیم ما از بهترین استادکاران و طراحان تشکیل
                شده که با دقت و ظرافت، هر قطعه را به اثری هنری تبدیل می‌کنند.
              </p>
              <p>
                امروز، گالری هنگام به عنوان یکی از معتبرترین برندهای جواهرات در ایران شناخته می‌شود
                و مشتریان ما در سراسر کشور از کیفیت و اصالت محصولات ما رضایت کامل دارند.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600"
              alt="داستان گالری هنگام"
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-lg"></div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-300 text-center mb-12">ارزش‌های ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="shield-check" size={32} color="#0f172a" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-3">اصالت</h3>
              <p className="text-gray-400">
                تمامی محصولات ما دارای گواهی اصالت هستند و از بهترین مواد اولیه ساخته می‌شوند
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="star" size={32} color="#0f172a" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-3">کیفیت</h3>
              <p className="text-gray-400">
                ما بالاترین استانداردهای کیفیت را در طراحی و ساخت جواهرات رعایت می‌کنیم
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="heart" size={32} color="#0f172a" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-3">مشتری‌مداری</h3>
              <p className="text-gray-400">
                رضایت مشتریان ما اولویت اول ماست و تمام تلاش خود را برای ارائه بهترین خدمات می‌کنیم
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-300 text-center mb-12">تیم ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="user" size={40} color="#0f172a" />
              </div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">احمد محمدی</h3>
              <p className="text-sm text-gray-400 mb-2">مدیرعامل و بنیان‌گذار</p>
              <p className="text-xs text-gray-500">بیش از ۳۰ سال تجربه در صنعت جواهرات</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="user" size={40} color="#0f172a" />
              </div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">فاطمه احمدی</h3>
              <p className="text-sm text-gray-400 mb-2">طراح ارشد</p>
              <p className="text-xs text-gray-500">متخصص در طراحی جواهرات مدرن و کلاسیک</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="user" size={40} color="#0f172a" />
              </div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">علی رضایی</h3>
              <p className="text-sm text-gray-400 mb-2">استادکار ارشد</p>
              <p className="text-xs text-gray-500">استادکار با ۲۵ سال سابقه در ساخت جواهرات</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="user" size={40} color="#0f172a" />
              </div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">مریم کریمی</h3>
              <p className="text-sm text-gray-400 mb-2">مدیر فروش</p>
              <p className="text-xs text-gray-500">متخصص در روابط مشتری و خدمات پس از فروش</p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-slate-800 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-300 text-center mb-12">آمار و دستاوردها</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">۳۰+</div>
              <div className="text-gray-400">سال تجربه</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">۱۰,۰۰۰+</div>
              <div className="text-gray-400">مشتری راضی</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">۵,۰۰۰+</div>
              <div className="text-gray-400">محصول منحصر به فرد</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">۱۵</div>
              <div className="text-gray-400">شهر فعال</div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-slate-800 rounded-lg p-8">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <Icon name="target" size={32} className="text-yellow-400" />
              <h3 className="text-2xl font-bold text-gray-300">ماموریت ما</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              ما متعهد به ارائه بهترین جواهرات دست‌ساز با بالاترین کیفیت و اصالت هستیم. هدف ما این
              است که هر مشتری با خرید از گالری هنگام، نه تنها یک محصول زیبا، بلکه تجربه‌ای منحصر به
              فرد و رضایت‌بخش داشته باشد.
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-8">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <Icon name="eye" size={32} className="text-yellow-400" />
              <h3 className="text-2xl font-bold text-gray-300">چشم‌انداز ما</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              ما می‌خواهیم به عنوان پیشروترین برند جواهرات در ایران و منطقه شناخته شویم. هدف ما
              گسترش فعالیت‌هایمان به بازارهای بین‌المللی و معرفی هنر جواهرسازی ایرانی به جهان است.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-gray-300 mb-4">
            به خانواده بزرگ گالری هنگام بپیوندید
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            از تجربه خرید منحصر به فرد ما لذت ببرید و جواهرات زیبا و باکیفیت را در کنار خدمات عالی
            دریافت کنید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => (window.location.href = "/products")}
              size="lg"
              icon={<Icon name="shopping-cart" size={20} />}
              iconPosition="right">
              مشاهده محصولات
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/contact")}
              size="lg"
              icon={<Icon name="envelope" size={20} />}
              iconPosition="right">
              تماس با ما
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
