import React, { useState, useEffect } from "react";

interface ToastProps {
  title: string;
  message?: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ title, message, type = "info", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeClasses = {
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    warning: "bg-yellow-600 text-white",
    info: "bg-blue-600 text-white",
  };

  const iconClasses = {
    success: "lni lni-checkmark-circle",
    error: "lni lni-close-circle",
    warning: "lni lni-warning",
    info: "lni lni-information",
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      } ${typeClasses[type]}`}>
      <i className={`${iconClasses[type]} text-lg`} />
      <div className="flex flex-col">
        <span className="font-medium">{title}</span>
        {message && <span className="text-sm opacity-90">{message}</span>}
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose?.(), 300);
        }}
        className="mr-2 hover:opacity-75 transition-opacity">
        <i className="lni lni-close text-sm" />
      </button>
    </div>
  );
};

export { Toast };
