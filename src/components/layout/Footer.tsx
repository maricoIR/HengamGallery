import React from "react";
import { Icon } from "../ui/Icon";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { name: "گردنبند", href: "/products?category=necklaces" },
      { name: "دستبند", href: "/products?category=bracelets" },
      { name: "انگشتر", href: "/products?category=rings" },
      { name: "گوشواره", href: "/products?category=earrings" },
      { name: "ساعت", href: "/products?category=watches" },
    ],
    company: [
      { name: "درباره ما", href: "/about" },
      { name: "تماس با ما", href: "/contact" },
      { name: "سوالات متداول", href: "/faq" },
      { name: "شرایط و قوانین", href: "/terms" },
      { name: "حمل و نقل", href: "/shipping" },
    ],
    // Support column removed
  };

  const socialLinks = [
    { name: "اینستاگرام", icon: "instagram", href: "https://instagram.com/hengamgallery" },
    { name: "تلگرام", icon: "telegram", href: "https://t.me/hengamgallery" },
    { name: "واتساپ", icon: "whatsapp", href: "https://wa.me/989123456789" },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <Icon name="diamond" size={24} color="#0f172a" />
              </div>
              <span className="mr-3 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow">
                گالری هنگام
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              ارائه بهترین جواهرات دست‌ساز با کیفیت عالی و طراحی منحصر به فرد
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                  aria-label={social.name}>
                  <Icon name={social.icon} size={24} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">محصولات</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">شرکت</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} گالری هنگام. تمامی حقوق محفوظ است.
            </div>
            <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-400">
              <span className="flex items-center">
                <Icon name="phone" size={16} className="ml-2" />
                ۰۲۱-۱۲۳۴۵۶۷۸
              </span>
              <span className="flex items-center">
                <Icon name="envelope" size={16} className="ml-2" />
                info@hengamgallery.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
