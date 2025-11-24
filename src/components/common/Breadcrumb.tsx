import React from "react";
import { Icon } from "../ui/Icon";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = "" }) => {
  if (items.length <= 1) {
    return null;
  }

  return (
    <nav
      className={`flex items-center space-x-2 space-x-reverse text-sm ${className}`}
      aria-label="مسیر ناوبری">
      <ol className="flex items-center space-x-2 space-x-reverse">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <Icon name="chevron-left" size={16} className="text-gray-500 mx-2" />}

            {item.isActive ? (
              <span className="text-gray-300 font-medium" aria-current="page">
                {item.label}
              </span>
            ) : item.href ? (
              <a
                href={item.href}
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                {item.label}
              </a>
            ) : (
              <span className="text-gray-400">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
