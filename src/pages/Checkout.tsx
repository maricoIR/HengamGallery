import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Textarea } from "../components/ui/Textarea";
import Button from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { formatPrice } from "../utils/formatPrice";

const Checkout: React.FC = () => {
  const { state: cartState } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    province: "",
    city: "",
    address: "",
    postalCode: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const provinces = [
    { value: "tehran", label: "تهران" },
    { value: "isfahan", label: "اصفهان" },
    { value: "shiraz", label: "شیراز" },
    { value: "mashhad", label: "مشهد" },
    { value: "tabriz", label: "تبریز" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) newErrors.fullName = "نام و نام خانوادگی الزامی است";
    if (!formData.phone) newErrors.phone = "شماره تلفن الزامی است";
    if (!formData.province) newErrors.province = "انتخاب استان الزامی است";
    if (!formData.city) newErrors.city = "نام شهر الزامی است";
    if (!formData.address) newErrors.address = "آدرس الزامی است";
    if (!formData.postalCode) newErrors.postalCode = "کد پستی الزامی است";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      window.location.href = "/order-success";
    }
  };

  const shippingCost = cartState.totalPrice > 50000000 ? 0 : 5000000;
  const finalTotal = cartState.totalPrice + shippingCost;

  if (cartState.items.length === 0) {
    window.location.href = "/cart";
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow mb-8">
          تکمیل خرید
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">اطلاعات تحویل گیرنده</h2>
                <div className="space-y-4">
                  <Input
                    label="نام و نام خانوادگی"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    error={errors.fullName}
                    placeholder="نام و نام خانوادگی خود را وارد کنید"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="شماره تلفن"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={errors.phone}
                      placeholder="09123456789"
                    />

                    <Input
                      label="ایمیل (اختیاری)"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">آدرس تحویل</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="استان"
                      options={provinces}
                      value={formData.province}
                      onChange={(value) => handleSelectChange("province", value)}
                      placeholder="استان را انتخاب کنید"
                    />

                    <Input
                      label="شهر"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      error={errors.city}
                      placeholder="نام شهر را وارد کنید"
                    />
                  </div>

                  <Textarea
                    label="آدرس کامل"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    error={errors.address}
                    placeholder="آدرس کامل خود را وارد کنید"
                    rows={3}
                  />

                  <Input
                    label="کد پستی"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    error={errors.postalCode}
                    placeholder="کد پستی ده رقمی"
                  />

                  <Textarea
                    label="توضیحات (اختیاری)"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="توضیحات اضافی درباره سفارش"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-800 rounded-lg p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">خلاصه سفارش</h2>

                <div className="space-y-3 mb-6">
                  {cartState.items.map((item) => (
                    <div
                      key={`${item.product.id}-${JSON.stringify(item.selectedVariations)}`}
                      className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        {item.product.name_fa} × {item.quantity}
                      </span>
                      <span className="text-gray-300">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-slate-600 pt-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">جمع محصولات:</span>
                    <span className="text-gray-300">{formatPrice(cartState.totalPrice)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">هزینه ارسال:</span>
                    <span className="text-gray-300">
                      {shippingCost === 0 ? (
                        <span className="text-green-400">رایگان</span>
                      ) : (
                        formatPrice(shippingCost)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg font-bold border-t border-slate-600 pt-3">
                    <span className="text-gray-300">مجموع:</span>
                    <span className="text-yellow-400">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  icon={<Icon name="credit-card" size={20} />}
                  iconPosition="right">
                  پرداخت و تکمیل سفارش
                </Button>

                <div className="mt-4 flex items-center justify-center space-x-2 space-x-reverse text-sm text-gray-400">
                  <Icon name="shield-check" size={16} />
                  <span>پرداخت امن</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
