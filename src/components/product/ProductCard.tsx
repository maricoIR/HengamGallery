import React, { useState } from "react";
import type { Product } from "../../utils/mockData";
import { calculateDiscount, formatDiscount } from "../../utils/formatPrice";
import { Icon } from "../ui/Icon";
import { Badge } from "../common/Badge";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  return (
    <div
      className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="relative flex-shrink-0">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name_fa}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {discount > 0 && (
          <div className="absolute top-2 right-2">
            <Badge variant="error" size="sm">
              {formatDiscount(discount)}
            </Badge>
          </div>
        )}

        {isHovered && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={() => navigate(`/product/${product.id}`)}
              size="sm"
              icon={<Icon name="eye" size={16} />}
              iconPosition="right">
              مشاهده محصول
            </Button>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-300">{product.rating}</span>
            <Icon name="star-filled" size={16} className="text-yellow-400 mt-[-3px]" />
          </div>
          {/* <Badge variant={product.stock > 0 ? "success" : "error"} size="sm">
            {product.stock > 0 ? "موجود" : "ناموجود"}
          </Badge> */}
        </div>

        <a href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-300 mb-2 line-clamp-2 hover:text-yellow-400 transition-colors duration-200">
            {product.name_fa}
          </h3>
        </a>

        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            {/* <span className="text-lg font-bold text-yellow-400">{formatPrice(product.price)}</span> */}
            <div className="flex items-center gap-1">
              <span className="text-md font-bold text-yellow-400">قیمت :</span>
              <span className="text-sm font-bold text-yellow-400">تماس بگیرید</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="default" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        <Button
          onClick={() => navigate(`/product/${product.id}`)}
          fullWidth
          disabled={product.stock === 0}
          // icon={<Icon name="eye" size={16} />}
          iconPosition="right"
          className="mt-3.5">
          {product.stock > 0 ? "مشاهده محصول" : "ناموجود"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
