import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import Button from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Badge } from "../common/Badge";

interface Ticket {
  id: number;
  subject: string;
  category: string;
  status: string;
  priority: string;
  createdAt: string;
  lastUpdate: string;
  messages: number;
}

const SupportTickets: React.FC = () => {
  const [tickets] = useState<Ticket[]>([
    {
      id: 1,
      subject: "مشکل در ارسال سفارش",
      category: "ارسال",
      status: "در انتظار پاسخ",
      priority: "متوسط",
      createdAt: "۱۴۰۳/۰۱/۱۵",
      lastUpdate: "۱۴۰۳/۰۱/۱۶",
      messages: 3,
    },
    {
      id: 2,
      subject: "سوال درباره گارانتی محصول",
      category: "گارانتی",
      status: "پاسخ داده شده",
      priority: "کم",
      createdAt: "۱۴۰۳/۰۱/۱۰",
      lastUpdate: "۱۴۰۳/۰۱/۱۲",
      messages: 2,
    },
    {
      id: 3,
      subject: "درخواست بازگشت کالا",
      category: "بازگشت",
      status: "در حال بررسی",
      priority: "بالا",
      createdAt: "۱۴۰۳/۰۱/۱۸",
      lastUpdate: "۱۴۰۳/۰۱/۱۹",
      messages: 4,
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    { value: "general", label: "عمومی" },
    { value: "order", label: "سفارش" },
    { value: "shipping", label: "ارسال" },
    { value: "payment", label: "پرداخت" },
    { value: "warranty", label: "گارانتی" },
    { value: "return", label: "بازگشت" },
    { value: "technical", label: "فنی" },
  ];

  const priorities = [
    { value: "low", label: "کم" },
    { value: "medium", label: "متوسط" },
    { value: "high", label: "بالا" },
    { value: "urgent", label: "فوری" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "پاسخ داده شده":
        return "success";
      case "در انتظار پاسخ":
        return "warning";
      case "در حال بررسی":
        return "info";
      case "بسته شده":
        return "default";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "فوری":
        return "error";
      case "بالا":
        return "warning";
      case "متوسط":
        return "info";
      case "کم":
        return "default";
      default:
        return "default";
    }
  };

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

    if (!formData.subject.trim()) newErrors.subject = "موضوع الزامی است";
    if (!formData.category) newErrors.category = "انتخاب دسته‌بندی الزامی است";
    if (!formData.priority) newErrors.priority = "انتخاب اولویت الزامی است";
    if (!formData.message.trim()) newErrors.message = "پیام الزامی است";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Here you would typically send the ticket to the server
    console.log("Creating ticket:", formData);

    // Reset form
    setFormData({
      subject: "",
      category: "",
      priority: "",
      message: "",
    });
    setErrors({});
    setIsCreating(false);

    alert("تیکت شما با موفقیت ارسال شد. به زودی پاسخ دریافت خواهید کرد.");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-300">تیکت‌های پشتیبانی</h2>
        <Button
          variant="outline"
          onClick={() => setIsCreating(true)}
          icon={<Icon name="plus" size={20} />}
          iconPosition="right">
          ایجاد تیکت جدید
        </Button>
      </div>

      {isCreating && (
        <div className="bg-slate-700 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">ایجاد تیکت پشتیبانی جدید</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="موضوع"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              error={errors.subject}
              placeholder="موضوع تیکت خود را وارد کنید"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="دسته‌بندی"
                options={categories}
                value={formData.category}
                onChange={(value) => handleSelectChange("category", value)}
                placeholder="دسته‌بندی را انتخاب کنید"
              />

              <Select
                label="اولویت"
                options={priorities}
                value={formData.priority}
                onChange={(value) => handleSelectChange("priority", value)}
                placeholder="اولویت را انتخاب کنید"
              />
            </div>

            <Textarea
              label="پیام"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              error={errors.message}
              placeholder="توضیحات کامل مشکل یا سوال خود را بنویسید"
              rows={5}
            />

            <div className="flex space-x-4 space-x-reverse">
              <Button type="submit" icon={<Icon name="send" size={20} />} iconPosition="right">
                ارسال تیکت
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreating(false)}
                icon={<Icon name="close" size={20} />}
                iconPosition="right">
                انصراف
              </Button>
            </div>
          </form>
        </div>
      )}

      {tickets.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="headphone" size={64} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">تیکت پشتیبانی ندارید</h3>
          <p className="text-gray-400 mb-6">در صورت داشتن سوال یا مشکل، تیکت پشتیبانی ایجاد کنید</p>
          <Button
            onClick={() => setIsCreating(true)}
            icon={<Icon name="plus" size={20} />}
            iconPosition="right">
            ایجاد تیکت جدید
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-slate-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 space-x-reverse mb-2">
                    <h3 className="text-lg font-semibold text-gray-300">
                      #{ticket.id} - {ticket.subject}
                    </h3>
                    <Badge variant={getStatusColor(ticket.status) as any}>{ticket.status}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-400">
                    <span>دسته‌بندی: {ticket.category}</span>
                    <span>اولویت: {ticket.priority}</span>
                    <span>تاریخ ایجاد: {ticket.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Badge variant={getPriorityColor(ticket.priority) as any}>
                    {ticket.priority}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-600">
                <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-400">
                  <span className="flex items-center space-x-1 space-x-reverse">
                    <Icon name="message" size={16} />
                    <span>{ticket.messages} پیام</span>
                  </span>
                  <span>آخرین بروزرسانی: {ticket.lastUpdate}</span>
                </div>
                <div className="text-sm text-yellow-400">
                  تیکت شما دریافت شد. کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">راه‌های ارتباط با پشتیبانی</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <Icon name="phone" size={32} className="text-yellow-400 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-300 mb-1">تماس تلفنی</h4>
            <p className="text-sm text-gray-400">۰۲۱-۱۲۳۴۵۶۷۸</p>
          </div>
          <div className="text-center">
            <Icon name="envelope" size={32} className="text-yellow-400 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-300 mb-1">ایمیل</h4>
            <p className="text-sm text-gray-400">support@hengamgallery.com</p>
          </div>
          <div className="text-center">
            <Icon name="clock" size={32} className="text-yellow-400 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-300 mb-1">ساعات کاری</h4>
            <p className="text-sm text-gray-400">۹ صبح تا ۶ عصر</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;
