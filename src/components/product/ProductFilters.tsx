import React, { useState } from "react";
import { Select } from "../ui/Select";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import { Icon } from "../ui/Icon";

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  categories: Array<{ id: number; name: string; slug: string }>;
}

interface FilterState {
  category: string | number;
  minPrice: string;
  maxPrice: string;
  material: string;
  sortBy: string;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ onFiltersChange, categories }) => {
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    minPrice: "",
    maxPrice: "",
    material: "",
    sortBy: "",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const materialOptions = [
    { value: "", label: "همه مواد" },
    { value: "طلای ۱۸ عیار", label: "طلای ۱۸ عیار" },
    { value: "طلای ۱۴ عیار", label: "طلای ۱۴ عیار" },
    { value: "نقره", label: "نقره" },
    { value: "الماس", label: "الماس" },
    { value: "مروارید", label: "مروارید" },
  ];

  const sortOptions = [
    { value: "", label: "پیش‌فرض" },
    { value: "price-asc", label: "قیمت: کم به زیاد" },
    { value: "price-desc", label: "قیمت: زیاد به کم" },
    { value: "rating", label: "بالاترین امتیاز" },
    { value: "newest", label: "جدیدترین" },
  ];

  const categoryOptions = [
    { value: "", label: "همه دسته‌بندی‌ها" },
    ...categories.map((cat) => ({
      value: cat.slug,
      label: cat.name,
    })),
  ];

  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterState = {
      category: "",
      minPrice: "",
      maxPrice: "",
      material: "",
      sortBy: "",
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-300">فیلترها</h3>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            icon={<Icon name="close" size={16} />}
            iconPosition="right">
            پاک کردن
          </Button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden text-gray-300 hover:text-yellow-400">
            <Icon name={isExpanded ? "chevron-up" : "chevron-down"} size={20} />
          </button>
        </div>
      </div>

      <div className={`space-y-4 ${isExpanded ? "block" : "hidden md:block"}`}>
        <Select
          label="دسته‌بندی"
          options={categoryOptions}
          value={filters.category}
          onChange={(value) => handleFilterChange("category", value)}
        />

        <Select
          label="جنس"
          options={materialOptions}
          value={filters.material}
          onChange={(value) => handleFilterChange("material", value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="حداقل قیمت"
            type="number"
            placeholder="۰"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
          />
          <Input
            label="حداکثر قیمت"
            type="number"
            placeholder="نامحدود"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
          />
        </div>

        <Select
          label="مرتب‌سازی"
          options={sortOptions}
          value={filters.sortBy}
          onChange={(value) => handleFilterChange("sortBy", value)}
        />
      </div>
    </div>
  );
};

export default ProductFilters;
