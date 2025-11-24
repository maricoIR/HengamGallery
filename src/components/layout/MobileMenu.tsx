import React from "react";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { Icon } from "../ui/Icon";
import Button from "../ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { state: cartState } = useCart();
  const { isAuthenticated, user } = useAuth();

  const navigationItems = [
    { name: "خانه", href: "/" },
    { name: "محصولات", href: "/products" },
    { name: "درباره ما", href: "/about" },
    { name: "تماس با ما", href: "/contact" },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  // Removed explicit null check to allow for transitions
  
  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`} 
        onClick={onClose} 
      />

      <div 
        className={`fixed right-0 top-0 h-full w-80 bg-slate-900 shadow-xl transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <Icon name="diamond" size={20} color="#0f172a" />
              </div>
              <span className="mr-2 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow">
                گالری هنگام
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-slate-800 transition-colors duration-200">
              <Icon name="close" size={24} />
            </button>
          </div>

          {/* User Section */}
          <div className="p-4 border-b border-slate-700">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                  <Icon name="user" size={24} color="#0f172a" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-300 font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-400">{user?.email}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    window.location.href = "/login";
                    onClose();
                  }}
                  fullWidth
                  variant="outline">
                  ورود
                </Button>
                <Button
                  onClick={() => {
                    window.location.href = "/register";
                    onClose();
                  }}
                  fullWidth>
                  ثبت نام
                </Button>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={handleLinkClick}
                      className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-slate-800 transition-colors duration-200">
                      <Icon name="arrow-left" size={20} />
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Quick Actions */}
            <div className="p-4 border-t border-slate-700">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">دسترسی سریع</h3>
              <div className="space-y-2">
                <a
                  href="/cart"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-slate-800 transition-colors duration-200">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Icon name="shopping-cart" size={20} />
                    <span>سبد خرید</span>
                  </div>
                  {cartState.items.length > 0 && (
                    <span className="bg-yellow-500 text-slate-900 text-xs font-bold px-2 py-1 rounded-full">
                      {cartState.items.length}
                    </span>
                  )}
                </a>

                {isAuthenticated && (
                  <>
                    <a
                      href="/profile"
                      onClick={handleLinkClick}
                      className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-slate-800 transition-colors duration-200">
                      <Icon name="user" size={20} />
                      <span>پروفایل</span>
                    </a>
                    <a
                      href="/profile?tab=favorites"
                      onClick={handleLinkClick}
                      className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-slate-800 transition-colors duration-200">
                      <Icon name="heart" size={20} />
                      <span>علاقه‌مندی‌ها</span>
                    </a>
                  </>
                )}

                <a
                  href="/faq"
                  onClick={handleLinkClick}
                  className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-slate-800 transition-colors duration-200">
                  <Icon name="help-circle" size={20} />
                  <span>سوالات متداول</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center justify-center space-x-4 space-x-reverse">
              <a
                href="https://instagram.com/hengamgallery"
                className="p-2 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-slate-800 transition-colors duration-200">
                <Icon name="instagram" size={20} />
              </a>
              <a
                href="https://telegram.me/hengamgallery"
                className="p-2 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-slate-800 transition-colors duration-200">
                <Icon name="telegram" size={20} />
              </a>
              <a
                href="https://wa.me/989123456789"
                className="p-2 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-slate-800 transition-colors duration-200">
                <Icon name="whatsapp" size={20} />
              </a>
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">
              © ۱۴۰۳ گالری هنگام. تمامی حقوق محفوظ است.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
