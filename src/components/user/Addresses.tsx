import React, { useState } from "react";
import { mockUser } from "../../utils/mockData";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import Button from "../ui/Button";
import { Icon } from "../ui/Icon";

interface Address {
  id: number;
  title: string;
  address: string;
  postalCode: string;
  city: string;
  province: string;
}

const Addresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>(mockUser.addresses);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    postalCode: "",
    city: "",
    province: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const provinces = [
    { value: "tehran", label: "تهران" },
    { value: "isfahan", label: "اصفهان" },
    { value: "shiraz", label: "شیراز" },
    { value: "mashhad", label: "مشهد" },
    { value: "tabriz", label: "تبریز" },
    { value: "kerman", label: "کرمان" },
    { value: "ahvaz", label: "اهواز" },
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

    if (!formData.title.trim()) newErrors.title = "عنوان آدرس الزامی است";
    if (!formData.address.trim()) newErrors.address = "آدرس الزامی است";
    if (!formData.postalCode.trim()) newErrors.postalCode = "کد پستی الزامی است";
    if (!formData.city.trim()) newErrors.city = "نام شهر الزامی است";
    if (!formData.province) newErrors.province = "انتخاب استان الزامی است";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingId) {
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === editingId ? { ...addr, ...formData } : addr))
      );
    } else {
      const newAddress: Address = {
        id: Date.now(),
        ...formData,
      };
      setAddresses((prev) => [...prev, newAddress]);
    }

    resetForm();
  };

  const handleEdit = (address: Address) => {
    setFormData({
      title: address.title,
      address: address.address,
      postalCode: address.postalCode,
      city: address.city,
      province: address.province,
    });
    setEditingId(address.id);
    setIsAdding(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("آیا از حذف این آدرس اطمینان دارید؟")) {
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      address: "",
      postalCode: "",
      city: "",
      province: "",
    });
    setErrors({});
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-300">آدرس‌های من</h2>
        <Button
          variant="outline"
          onClick={() => setIsAdding(true)}
          icon={<Icon name="plus" size={20} />}
          iconPosition="right">
          افزودن آدرس جدید
        </Button>
      </div>

      {isAdding && (
        <div className="bg-slate-700 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">
            {editingId ? "ویرایش آدرس" : "افزودن آدرس جدید"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="عنوان آدرس"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                error={errors.title}
                placeholder="مثل: خانه، محل کار"
              />

              <Select
                label="استان"
                options={provinces}
                value={formData.province}
                onChange={(value) => handleSelectChange("province", value)}
                placeholder="استان را انتخاب کنید"
              />
            </div>

            <Input
              label="شهر"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              error={errors.city}
              placeholder="نام شهر را وارد کنید"
            />

            <Input
              label="آدرس کامل"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              error={errors.address}
              placeholder="آدرس کامل خود را وارد کنید"
            />

            <Input
              label="کد پستی"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              error={errors.postalCode}
              placeholder="کد پستی ده رقمی"
            />

            <div className="flex space-x-4 space-x-reverse">
              <Button type="submit" icon={<Icon name="checkmark" size={20} />} iconPosition="right">
                {editingId ? "ذخیره تغییرات" : "افزودن آدرس"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                icon={<Icon name="close" size={20} />}
                iconPosition="right">
                انصراف
              </Button>
            </div>
          </form>
        </div>
      )}

      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="map-marker" size={64} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">آدرسی ثبت نشده است</h3>
          <p className="text-gray-400 mb-6">برای تسریع در فرآیند خرید، آدرس خود را اضافه کنید</p>
          <Button
            onClick={() => setIsAdding(true)}
            icon={<Icon name="plus" size={20} />}
            iconPosition="right">
            افزودن آدرس
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div key={address.id} className="bg-slate-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">{address.title}</h3>
                  <div className="space-y-1 text-sm text-gray-400">
                    <p>{address.address}</p>
                    <p>
                      {address.city}، {address.province}
                    </p>
                    <p>کد پستی: {address.postalCode}</p>
                  </div>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(address)}
                    icon={<Icon name="edit" size={16} />}
                    iconPosition="only"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(address.id)}
                    icon={<Icon name="trash" size={16} />}
                    iconPosition="only"
                    className="text-red-400 hover:text-red-300"
                  />
                </div>
              </div>
              <div className="flex space-x-2 space-x-reverse">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  icon={<Icon name="checkmark" size={16} />}
                  iconPosition="right">
                  آدرس پیش‌فرض
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
