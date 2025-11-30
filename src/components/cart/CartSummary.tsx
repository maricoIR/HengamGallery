import React from "react";
import type { CartItem } from "../../utils/mockData";
import { formatPrice } from "../../utils/formatPrice";
import Button from "../ui/Button";
import { Icon } from "../ui/Icon";

interface CartSummaryProps {
  items: CartItem[];
  totalPrice: number;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  items,
  totalPrice,
  onCheckout,
  onContinueShopping,
}) => {
  const shippingCost = totalPrice > 50000000 ? 0 : 5000000;
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="bg-slate-800 rounded-lg p-6 sticky top-4">
      <h3 className="text-xl font-bold text-gray-300 mb-6">خلاصه سفارش</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">تعداد کالاها:</span>
          <span className="text-gray-300 font-medium">
            {items.reduce((sum, item) => sum + item.quantity, 0)} عدد
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400">قیمت کالاها:</span>
          <span className="text-gray-300 font-medium">{formatPrice(totalPrice)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400">هزینه ارسال:</span>
          <span className="text-gray-300 font-medium">
            {shippingCost === 0 ? (
              <span className="text-green-400">رایگان</span>
            ) : (
              formatPrice(shippingCost)
            )}
          </span>
        </div>

        {shippingCost > 0 && (
          <div className="text-sm text-gray-500 bg-slate-700 p-3 rounded-lg">
            <Icon name="info" size={16} className="inline ml-1" />
            برای ارسال رایگان، مبلغ سفارش باید بیش از {formatPrice(50000000)} باشد
          </div>
        )}

        <div className="border-t border-slate-600 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-300">مجموع:</span>
            <span className="text-xl font-bold text-yellow-400">{formatPrice(finalTotal)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={onCheckout}
          fullWidth
          size="lg"
          icon={<Icon name="credit-card" size={20} />}
          iconPosition="right">
          تکمیل سفارش
        </Button>

        <Button
          variant="outline"
          onClick={onContinueShopping}
          fullWidth
          icon={<Icon name="arrow-left" size={20} />}
          iconPosition="right">
          ادامه خرید
        </Button>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-600">
        <div className="flex items-center justify-center space-x-2 space-x-reverse text-sm text-gray-400">
          <Icon name="shield-check" size={16} />
          <span>خرید امن و تضمین شده</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
