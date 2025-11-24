import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Icon } from "../components/ui/Icon";
import Button from "../components/ui/Button";
import PersonalInfo from "../components/user/PersonalInfo";
import OrdersList from "../components/user/OrdersList";
import Addresses from "../components/user/Addresses";
import SupportTickets from "../components/user/SupportTickets";
import FavoritesList from "../components/user/FavoritesList";

type TabType = "personal" | "orders" | "addresses" | "tickets" | "favorites";

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("personal");

  const tabs = [
    {
      id: "personal" as TabType,
      label: "اطلاعات شخصی",
      icon: "user",
    },
    {
      id: "orders" as TabType,
      label: "سفارشات",
      icon: "receipt",
    },
    {
      id: "addresses" as TabType,
      label: "آدرس‌ها",
      icon: "map-marker",
    },
    {
      id: "tickets" as TabType,
      label: "تیکت‌های پشتیبانی",
      icon: "headphone",
    },
    {
      id: "favorites" as TabType,
      label: "علاقه‌مندی‌ها",
      icon: "heart",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfo />;
      case "orders":
        return <OrdersList />;
      case "addresses":
        return <Addresses />;
      case "tickets":
        return <SupportTickets />;
      case "favorites":
        return <FavoritesList />;
      default:
        return <PersonalInfo />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="user" size={64} className="text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-300 mb-4">لطفاً وارد شوید</h1>
          <p className="text-gray-400 mb-6">
            برای دسترسی به پروفایل خود، ابتدا وارد حساب کاربری شوید
          </p>
          <Button
            onClick={() => (window.location.href = "/login")}
            icon={<Icon name="arrow-left" size={20} />}
            iconPosition="right">
            ورود به حساب کاربری
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow mb-2">
                پروفایل کاربری
              </h1>
              <p className="text-gray-400">خوش آمدید، {user.name}</p>
            </div>
            <Button
              variant="outline"
              onClick={logout}
              icon={<Icon name="logout" size={20} />}
              iconPosition="right">
              خروج
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-lg p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="user" size={32} color="#0f172a" />
                </div>
                <h3 className="text-lg font-semibold text-gray-300">{user.name}</h3>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-right transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "bg-yellow-500 text-slate-900"
                        : "text-gray-300 hover:bg-slate-700"
                    }`}>
                    <Icon name={tab.icon} size={20} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-slate-800 rounded-lg p-6">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
