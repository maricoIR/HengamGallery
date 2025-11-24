import React, { useState } from "react";
import { formatPrice } from "../../utils/formatPrice";
import { useCart } from "../../hooks/useCart";
import { useFavorites } from "../../context/FavoritesContext";
import { Icon } from "../ui/Icon";
import Button from "../ui/Button";
import { Badge } from "../common/Badge";

const FavoritesList: React.FC = () => {
  const { addItem } = useCart();
  const { items: favoriteProducts, removeFromFavorites, clearFavorites } = useFavorites();
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleRemoveFromFavorites = async (productId: number) => {
    setRemovingId(productId);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    removeFromFavorites(productId);
    setRemovingId(null);
  };

  const handleAddToCart = (product: any) => {
    addItem(product, 1, {});
  };

  const handleClearAll = () => {
    if (confirm("آیا از حذف تمام علاقه‌مندی‌ها اطمینان دارید؟")) {
      clearFavorites();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-300">علاقه‌مندی‌های من</h2>
        {favoriteProducts.length > 0 && (
          <Button
            variant="outline"
            onClick={handleClearAll}
            icon={<Icon name="trash" size={20} />}
            iconPosition="right">
            حذف همه
          </Button>
        )}
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="heart" size={64} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            هیچ محصولی در علاقه‌مندی‌ها نیست
          </h3>
          <p className="text-gray-400 mb-6">
            محصولاتی که دوست دارید را به علاقه‌مندی‌ها اضافه کنید
          </p>
          <Button
            onClick={() => (window.location.href = "/products")}
            icon={<Icon name="shopping-cart" size={20} />}
            iconPosition="right">
            مشاهده محصولات
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProducts.map((product) => (
            <div key={product.id} className="bg-slate-700 rounded-lg overflow-hidden group">
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.name_fa}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant={product.stock > 0 ? "success" : "error"} size="sm">
                    {product.stock > 0 ? "موجود" : "ناموجود"}
                  </Badge>
                </div>
                <button
                  onClick={() => handleRemoveFromFavorites(product.id)}
                  disabled={removingId === product.id}
                  className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 opacity-0 group-hover:opacity-100">
                  {removingId === product.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Icon name="heart-filled" size={16} />
                  )}
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-300 mb-2 line-clamp-2">
                  {product.name_fa}
                </h3>

                <div className="flex items-center space-x-2 space-x-reverse mb-3">
                  <Icon name="star-filled" size={16} className="text-yellow-400" />
                  <span className="text-sm text-gray-400">
                    {product.rating} ({product.reviews} نظر)
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-lg font-bold text-yellow-400">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2 space-x-reverse">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    size="sm"
                    className="flex-1"
                    icon={<Icon name="shopping-cart" size={16} />}
                    iconPosition="right">
                    افزودن به سبد
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => (window.location.href = `/product/${product.id}`)}
                    icon={<Icon name="eye" size={16} />}
                    iconPosition="right">
                    مشاهده
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {favoriteProducts.length > 0 && (
        <div className="mt-8 bg-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">آمار علاقه‌مندی‌ها</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{favoriteProducts.length}</div>
              <div className="text-sm text-gray-400">تعداد محصولات</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {favoriteProducts.filter((p) => p.stock > 0).length}
              </div>
              <div className="text-sm text-gray-400">محصولات موجود</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {formatPrice(favoriteProducts.reduce((sum, product) => sum + product.price, 0))}
              </div>
              <div className="text-sm text-gray-400">مجموع قیمت</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
