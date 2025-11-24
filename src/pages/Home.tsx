import React, { useState, useEffect } from "react";
import { mockApi, type Product, type InstagramPost } from "../utils/mockData";
import HeaderHero from "../components/layout/HeaderHero";
import ProductSlider from "../components/product/ProductSlider";
import { Icon } from "../components/ui/Icon";
import Button from "../components/ui/Button";

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [products, posts] = await Promise.all([
          mockApi.getProducts(),
          mockApi.getInstagramPosts(),
        ]);

        setFeaturedProducts(products.slice(0, 6));
        setNewProducts(products.slice(2, 8));
        setInstagramPosts(posts);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const serviceCards = [
    {
      icon: "diamond",
      title: "کیفیت عالی",
      description: "جواهرات دست‌ساز با بهترین مواد اولیه",
    },
    {
      icon: "truck",
      title: "ارسال سریع",
      description: "ارسال رایگان برای سفارشات بالای ۵۰ میلیون تومان",
    },
    {
      icon: "shield-check",
      title: "ضمانت کیفیت",
      description: "ضمانت اصالت و کیفیت تمام محصولات",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-400">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeaderHero />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {serviceCards.map((service, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-lg p-6 text-center hover:bg-slate-700 transition-colors duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon name={service.icon} size={32} color="#0f172a" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Promotional Banner */}
        <div className="mb-16">
          <div className="relative bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10"></div>
            <div className="relative px-8 py-12 md:px-16 md:pl-0 md:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 rounded-full text-yellow-400 text-sm font-medium mb-4">
                    <Icon name="diamond" size={16} className="ml-2" />
                    پیشنهاد ویژه
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow mb-4">
                    مجموعه طلای عروسی
                  </h2>
                  <p className="text-gray-300 text-lg mb-6">
                    مجموعه‌ای کامل از زیباترین طلاهای عروسی با طراحی‌های منحصر به فرد و کیفیت عالی
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => (window.location.href = "/products?category=wedding")}
                      size="lg"
                      icon={<Icon name="diamond" size={25} />}
                      iconPosition="right">
                      مشاهده مجموعه
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => (window.location.href = "/contact")}>
                      مشاوره رایگان
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="relative">
                    <div className="w-80 h-80 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-full mx-auto flex items-center justify-center">
                      <div className="w-64 h-64 bg-gradient-to-br from-yellow-400/30 to-yellow-500/30 rounded-full flex items-center justify-center">
                        <Icon name="diamond" size={120} color="#fbbf24" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <ProductSlider title="محصولات ویژه" products={featuredProducts} />
        </div>

        <div className="mb-16">
          <ProductSlider title="جدیدترین محصولات" products={newProducts} />
        </div>

        {/* Collection Showcase Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow mb-4">
              مجموعه‌های ویژه
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              مجموعه‌های منحصر به فرد طلا و جواهرات با طراحی‌های خاص و کیفیت عالی
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "مجموعه عروسی",
                description: "زیباترین طلاهای عروسی با طراحی‌های کلاسیک و مدرن",
                image: "💍",
                products: 24,
                discount: "۳۰٪",
              },
              {
                title: "مجموعه روزمره",
                description: "طلاهای شیک و کاربردی برای استفاده روزانه",
                image: "✨",
                products: 18,
                discount: "۲۰٪",
              },
              {
                title: "مجموعه خاص",
                description: "طراحی‌های منحصر به فرد و محدود برای افراد خاص",
                image: "👑",
                products: 12,
                discount: "۲۵٪",
              },
            ].map((collection, index) => (
              <div
                key={index}
                className="group bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => (window.location.href = `/products?collection=${collection.title}`)}>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">{collection.image}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">{collection.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{collection.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{collection.products} محصول</span>
                    <span className="bg-yellow-500 text-slate-900 px-3 py-1 rounded-full font-bold">
                      {collection.discount} تخفیف
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = "/products")}
              iconPosition="right">
              مشاهده همه مجموعه‌ها
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow mb-4">
              عضویت در خبرنامه
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              از جدیدترین محصولات و تخفیف‌های ویژه ما باخبر شوید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="ایمیل شما"
                className="flex-1 px-4 py-2 bg-slate-600 border border-slate-500 rounded-md text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                style={{ direction: "ltr" }}
              />
              <Button iconPosition="right">عضویت</Button>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow text-center mb-8">
            اینستاگرام ما
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-lg aspect-square">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Icon name="instagram" size={32} color="white" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
