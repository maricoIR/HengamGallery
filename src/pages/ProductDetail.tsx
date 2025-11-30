import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mockApi, mockProducts, type Product } from "../utils/mockData";
import { formatPrice, calculateDiscount, formatDiscount } from "../utils/formatPrice";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../context/FavoritesContext";
import { Select } from "../components/ui/Select";
import ProductSlider from "../components/product/ProductSlider";
import ImageGallery from "../components/product/ImageGallery";
import Breadcrumb from "../components/common/Breadcrumb";
import { Icon } from "../components/ui/Icon";
import Button from "../components/ui/Button";
import { Badge } from "../components/common/Badge";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});
  const [quantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        const productData = await mockApi.getProduct(parseInt(id));
        if (productData) {
          setProduct(productData);
          let related = mockProducts.filter(
            (p) => p.id !== productData.id && p.tags.some((tag) => productData.tags.includes(tag))
          );

          if (related.length < 4) {
            const others = mockProducts.filter(
              (p) => p.id !== productData.id && !related.find((r) => r.id === p.id)
            );
            related = [...related, ...others];
          }

          setRelatedProducts(related.slice(0, 8));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading product:", error);
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleVariationChange = (key: string, value: string) => {
    setSelectedVariations((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity, selectedVariations);
    }
  };


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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="search" size={64} className="text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-300 mb-2">محصول یافت نشد</h1>
          <p className="text-gray-400 mb-6">محصول مورد نظر شما وجود ندارد یا حذف شده است</p>
          <Button onClick={() => window.history.back()}>بازگشت</Button>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const getBreadcrumbItems = (): Array<{ label: string; href?: string; isActive?: boolean }> => {
    const items: Array<{ label: string; href?: string; isActive?: boolean }> = [
      { label: "خانه", href: "/" },
      { label: "محصولات", href: "/products" },
    ];

    if (product) {
      const firstTag = product.tags[0];
      if (firstTag) {
        items.push({ label: firstTag, href: `/products?category=${firstTag.toLowerCase()}` });
      }
      items.push({ label: product.name_fa, isActive: true });
    }

    return items;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={getBreadcrumbItems()} className="mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <ImageGallery images={product.images} productName={product.name_fa} />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Icon name="star-filled" size={20} className="text-yellow-400" />
                  <span className="text-gray-300">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews} نظر)</span>
                </div>
                <Badge variant={product.stock > 0 ? "success" : "error"}>
                  {product.stock > 0 ? "موجود" : "ناموجود"}
                </Badge>
              </div>

              <h1 className="text-3xl font-bold text-gray-300 mb-4">{product.name_fa}</h1>

              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <span className="text-3xl font-bold text-yellow-400">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <div className="flex flex-col">
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="error" size="sm">
                      {formatDiscount(discount)}
                    </Badge>
                  </div>
                )}
              </div>

              <p className="text-gray-400 leading-relaxed">{product.description}</p>
            </div>

            {product.variations && (
              <div className="space-y-4">
                {Object.entries(product.variations).map(([key, options]) => (
                  <div key={key}>
                    <Select
                      label={key === "size" ? "سایز" : key === "material" ? "جنس" : "رنگ"}
                      options={options.map((option) => ({ value: option, label: option }))}
                      value={selectedVariations[key] || ""}
                      onChange={(value) => handleVariationChange(key, value as string)}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-sm text-gray-400">{product.stock} عدد موجود</span>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                size="lg"
                icon={<Icon name="shopping-cart" size={20} />}
                iconPosition="right"
                className="flex-1">
                افزودن به سبد خرید
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => product && toggleFavorite(product)}
                icon={
                  <Icon
                    name={product && isFavorite(product.id) ? "heart-filled" : "heart"}
                    size={20}
                    className={product && isFavorite(product.id) ? "text-red-500" : ""}
                  />
                }
                iconPosition="only"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-300 mb-4">مشخصات محصول</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400">جنس:</span>
                  <span className="text-gray-300 mr-2">{product.specifications.material}</span>
                </div>
                <div>
                  <span className="text-gray-400">وزن:</span>
                  <span className="text-gray-300 mr-2">{product.specifications.weight}</span>
                </div>
                <div>
                  <span className="text-gray-400">ابعاد:</span>
                  <span className="text-gray-300 mr-2">{product.specifications.dimensions}</span>
                </div>
                <div>
                  <span className="text-gray-400">رنگ:</span>
                  <span className="text-gray-300 mr-2">{product.specifications.color}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">ویژگی‌ها</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Icon name="shield-check" size={20} className="text-green-400" />
                <span className="text-gray-300">ضمانت اصالت</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Icon name="truck" size={20} className="text-blue-400" />
                <span className="text-gray-300">ارسال رایگان</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Icon name="refresh" size={20} className="text-yellow-400" />
                <span className="text-gray-300">امکان بازگشت</span>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <ProductSlider title="محصولات مشابه" products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
