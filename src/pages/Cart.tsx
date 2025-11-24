import React from "react";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { Icon } from "../components/ui/Icon";
import Button from "../components/ui/Button";

const Cart: React.FC = () => {
  const { state: cartState } = useCart();

  const handleCheckout = () => {
    window.location.href = "/checkout";
  };

  const handleContinueShopping = () => {
    window.location.href = "/products";
  };

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8">
            <Icon name="shopping-cart" size={64} className="text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-300 mb-4">سبد خرید شما خالی است</h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            محصولات مورد علاقه خود را به سبد خرید اضافه کنید و از خرید لذت ببرید
          </p>
          <Button
            onClick={handleContinueShopping}
            size="lg"
            icon={<Icon name="arrow-left" size={20} />}
            iconPosition="right">
            شروع خرید
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow mb-4">
            سبد خرید
          </h1>
          <p className="text-gray-400">{cartState.totalItems} محصول در سبد خرید شما</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartState.items.map((item) => (
                <CartItem
                  key={`${item.product.id}-${JSON.stringify(item.selectedVariations)}`}
                  item={item}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <CartSummary
              items={cartState.items}
              totalPrice={cartState.totalPrice}
              onCheckout={handleCheckout}
              onContinueShopping={handleContinueShopping}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
