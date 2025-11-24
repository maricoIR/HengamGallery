import React from "react";
import { CartItem as CartItemType } from "../../utils/mockData";
import { formatPrice } from "../../utils/formatPrice";
import { useCart } from "../../hooks/useCart";
import { Icon } from "../ui/Icon";
import Button from "../ui/Button";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.product.id);
    } else {
      updateQuantity(item.product.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(item.product.id);
  };

  return (
    <div className="flex items-center space-x-4 space-x-reverse bg-slate-800 rounded-lg p-4">
      <div className="flex-shrink-0">
        <img
          src={item.product.images[0]}
          alt={item.product.name_fa}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-300 truncate">{item.product.name_fa}</h3>

        {item.selectedVariations && (
          <div className="mt-1 text-sm text-gray-400">
            {Object.entries(item.selectedVariations).map(([key, value]) => (
              <span key={key} className="ml-2">
                {key}: {value}
              </span>
            ))}
          </div>
        )}

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-8 h-8 rounded-full bg-slate-700 text-gray-300 hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
              aria-label="کاهش تعداد">
              <Icon name="minus" size={16} />
            </button>

            <span className="w-8 text-center text-gray-300 font-medium">{item.quantity}</span>

            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-8 h-8 rounded-full bg-slate-700 text-gray-300 hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
              aria-label="افزایش تعداد">
              <Icon name="plus" size={16} />
            </button>
          </div>

          <div className="text-right">
            <div className="text-lg font-bold text-yellow-400">
              {formatPrice(item.product.price * item.quantity)}
            </div>
            <div className="text-sm text-gray-400">
              {formatPrice(item.product.price)} × {item.quantity}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          icon={<Icon name="trash" size={16} />}
          iconPosition="only"
          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
        />
      </div>
    </div>
  );
};

export default CartItem;
