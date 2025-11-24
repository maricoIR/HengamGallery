import React, { useState } from "react";
import { mockUser } from "../../utils/mockData";
import { formatPrice } from "../../utils/formatPrice";
import { Icon } from "../ui/Icon";
import Button from "../ui/Button";
import { Badge } from "../common/Badge";

const OrdersList: React.FC = () => {
  const [orders] = useState(mockUser.orders);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "تحویل شده":
        return "success";
      case "در حال ارسال":
        return "info";
      case "در حال پردازش":
        return "warning";
      case "لغو شده":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "تحویل شده":
        return "checkmark-circle";
      case "در حال ارسال":
        return "truck";
      case "در حال پردازش":
        return "clock";
      case "لغو شده":
        return "close-circle";
      default:
        return "information";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-300">سفارشات من</h2>
        <Button variant="outline" icon={<Icon name="plus" size={20} />} iconPosition="right">
          سفارش جدید
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="receipt" size={64} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">هنوز سفارشی ثبت نکرده‌اید</h3>
          <p className="text-gray-400 mb-6">برای مشاهده سفارشات خود، ابتدا محصولی خریداری کنید</p>
          <Button
            onClick={() => (window.location.href = "/products")}
            icon={<Icon name="shopping-cart" size={20} />}
            iconPosition="right">
            شروع خرید
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-300">سفارش #{order.id}</h3>
                    <p className="text-sm text-gray-400">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <Badge variant={getStatusColor(order.status) as any}>
                    <Icon name={getStatusIcon(order.status)} size={16} className="ml-1" />
                    {order.status}
                  </Badge>
                  <span className="text-lg font-bold text-yellow-400">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">محصولات:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 space-x-reverse">
                        <img
                          src={item.images[0]}
                          alt={item.name_fa}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="text-sm text-gray-300">{item.name_fa}</p>
                          <p className="text-xs text-gray-400">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">جزئیات سفارش:</h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>تعداد محصولات:</span>
                      <span>{order.items.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>روش پرداخت:</span>
                      <span>آنلاین</span>
                    </div>
                    <div className="flex justify-between">
                      <span>روش ارسال:</span>
                      <span>پیک</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-600">
                <div className="flex space-x-2 space-x-reverse">
                  {order.status === "تحویل شده" && (
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Icon name="refresh" size={16} />}
                      iconPosition="right">
                      خرید مجدد
                    </Button>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Icon name="headphone" size={16} />}
                  iconPosition="right">
                  پشتیبانی
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersList;
