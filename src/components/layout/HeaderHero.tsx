import React from "react";
import Button from "../ui/Button";

const HeaderHero: React.FC = () => {
  return (
    <div className="relative min-h-[calc(100vh-65px)] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600")',
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      />
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl h-[80px] md:text-7xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 gold-text-glow">
          زیبایی جاودان
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          کالکشن منحصر‌به‌فرد جواهرات دست‌ساز ما را کشف کنید. هر قطعه یک شاهکار است.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/products">
            <Button size="lg">مشاهده محصولات</Button>
          </a>
          <a href="/about">
            <Button variant="outline" size="lg">
              درباره ما
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderHero;
