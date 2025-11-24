import React, { useState, useEffect } from "react";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from "../../context/FavoritesContext";
import { mockCategories, mockApi, type Product } from "../../utils/mockData";
import SearchAutocomplete from "../common/SearchAutocomplete";
import { Icon } from "../ui/Icon";
import MobileMenu from "./MobileMenu";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const { state: cartState } = useCart();
  const { isAuthenticated } = useAuth();
  const { getFavoritesCount } = useFavorites();

  const navigationItems = [
    { name: "پیگیری سفارش", href: "/track-order" },
    { name: "درباره ما", href: "/about" },
    { name: "تماس با ما", href: "/contact" },
  ];

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleProductSelect = (product: Product) => {
    window.location.href = `/product/${product.id}`;
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await mockApi.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products for search:", error);
      }
    };

    loadProducts();
  }, []);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".categories-dropdown")) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Icon name="diamond" size={24} color="#0f172a" />
                </div>
                <span className="mr-3 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow">
                  گالری هنگام
                </span>
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-baseline space-x-0">
              {/* Categories Dropdown */}
              <div className="relative categories-dropdown">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="text-gray-300 cursor-pointer hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center">
                  دسته‌بندی‌ها
                  <Icon name="chevron-down" size={16} className="mr-1" />
                </button>

                {isCategoriesOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-slate-800 rounded-lg shadow-xl border border-slate-700 z-50">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-300 mb-3">
                        دسته‌بندی محصولات
                      </h3>
                      <div className="space-y-2">
                        {mockCategories.map((category) => (
                          <a
                            key={category.id}
                            href={`/products?category=${category.slug}`}
                            onClick={() => setIsCategoriesOpen(false)}
                            className="block px-3 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-slate-700 rounded-md transition-colors duration-200">
                            {category.name}
                          </a>
                        ))}
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-700">
                        <a
                          href="/products"
                          onClick={() => setIsCategoriesOpen(false)}
                          className="block px-3 py-2 text-sm text-yellow-400 hover:text-yellow-300 font-medium">
                          مشاهده همه محصولات
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="hidden">
              <div className="relative">
                {isSearchOpen ? (
                  <div className="flex items-center">
                    <SearchAutocomplete
                      onSearch={() => {}}
                      onSelect={handleProductSelect}
                      products={products}
                      placeholder="جستجو در محصولات..."
                      className="w-64"
                    />
                    <button
                      type="button"
                      onClick={handleSearchToggle}
                      className="mr-2 text-gray-400 hover:text-yellow-400">
                      <Icon name="close" size={20} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSearchToggle}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                    <Icon name="search" size={25} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <a
                    href="/profile"
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                    <Icon name="user" size={25} />
                  </a>
                </div>
              ) : (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <a
                    href="/login"
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                    <Icon name="user" size={25} />
                  </a>
                </div>
              )}

              {/* Favorites Icon removed */}

              <a
                href="/cart"
                className="relative text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                <Icon name="shopping-cart" size={25} />
                {cartState.totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-slate-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartState.totalItems}
                  </span>
                )}
              </a>

              <div className="md:hidden relative z-50">
                <button
                  onClick={handleMobileMenuToggle}
                  className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                  <Icon name={isMobileMenuOpen ? "close" : "menu"} size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      </div>
    </nav>
  );
};

export default Navbar;
