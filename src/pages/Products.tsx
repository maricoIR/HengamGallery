import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { mockCategories, mockApi, type Product } from "../utils/mockData";
import ProductGrid from "../components/product/ProductGrid";
import ProductFilters from "../components/product/ProductFilters";
import Pagination from "../components/common/Pagination";
import Breadcrumb from "../components/common/Breadcrumb";
import { Icon } from "../components/ui/Icon";
import Button from "../components/ui/Button";

interface FilterState {
  category: string | number;
  minPrice: string;
  maxPrice: string;
  material: string;
  sortBy: string;
}

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await mockApi.getProducts();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading products:", error);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const searchParam = searchParams.get("search");
    const categoryParam = searchParams.get("category");

    if (searchParam) {
      setSearchQuery(searchParam);
    }

    if (categoryParam) {
      const category = mockCategories.find((cat) => cat.slug === categoryParam);
      if (category) {
        const filters: FilterState = {
          category: categoryParam,
          minPrice: "",
          maxPrice: "",
          material: "",
          sortBy: "",
        };
        applySearchAndFilters(searchParam || "", filters);
      }
    } else if (searchParam) {
      applySearchAndFilters(searchParam);
    }
  }, [searchParams]);

  const applySearchAndFilters = (query: string, filters?: FilterState) => {
    let filtered = [...products];

    // Apply search filter
    if (query.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name_fa.toLowerCase().includes(query.toLowerCase()) ||
          product.name_en.toLowerCase().includes(query.toLowerCase()) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply other filters if provided
    if (filters) {
      if (filters.category) {
        const category = mockCategories.find((cat) => cat.slug === filters.category);
        if (category) {
          filtered = filtered.filter((product) =>
            product.tags.some((tag) => tag.includes(category.name))
          );
        }
      }

      if (filters.material) {
        filtered = filtered.filter((product) =>
          product.specifications.material.toLowerCase().includes(filters.material.toLowerCase())
        );
      }

      if (filters.minPrice) {
        const minPrice = parseInt(filters.minPrice);
        if (!isNaN(minPrice)) {
          filtered = filtered.filter((product) => product.price >= minPrice);
        }
      }

      if (filters.maxPrice) {
        const maxPrice = parseInt(filters.maxPrice);
        if (!isNaN(maxPrice)) {
          filtered = filtered.filter((product) => product.price <= maxPrice);
        }
      }

      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "price-asc":
            filtered.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            filtered.sort((a, b) => b.price - a.price);
            break;
          case "rating":
            filtered.sort((a, b) => b.rating - a.rating);
            break;
          case "newest":
            filtered.sort((a, b) => b.id - a.id);
            break;
        }
      }
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleFiltersChange = (filters: FilterState) => {
    applySearchAndFilters(searchQuery, filters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const getPageTitle = () => {
    const categoryParam = searchParams.get("category");
    if (searchQuery) {
      return `نتایج جستجو برای "${searchQuery}"`;
    }
    if (categoryParam) {
      const category = mockCategories.find((cat) => cat.slug === categoryParam);
      return category ? `دسته‌بندی: ${category.name}` : "محصولات";
    }
    return "محصولات";
  };

  const getBreadcrumbItems = () => {
    const categoryParam = searchParams.get("category");
    const items = [{ label: "خانه", href: "/" }];

    if (categoryParam) {
      const category = mockCategories.find((cat) => cat.slug === categoryParam);
      if (category) {
        items.push({ label: "محصولات", href: "/products" });
        items.push({ label: category.name, isActive: true });
      } else {
        items.push({ label: "محصولات", isActive: true });
      }
    } else if (searchQuery) {
      items.push({ label: "محصولات", href: "/products" });
      items.push({ label: `جستجو: ${searchQuery}`, isActive: true });
    } else {
      items.push({ label: "محصولات", isActive: true });
    }

    return items;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={getBreadcrumbItems()} className="mb-6" />

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 gold-text-glow mb-4">
            {getPageTitle()}
          </h1>
          <p className="text-gray-400">
            {filteredProducts.length} محصول از {products.length} محصول موجود
            {searchQuery && (
              <span className="block mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    window.history.replaceState({}, "", "/products");
                    setFilteredProducts(products);
                    setCurrentPage(1);
                  }}
                  icon={<Icon name="close" size={16} />}
                  iconPosition="right">
                  پاک کردن جستجو
                </Button>
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="lg:sticky lg:top-4">
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowFilters(!showFilters)}
                  icon={<Icon name="filter" size={20} />}
                  iconPosition="right">
                  فیلترها
                </Button>
              </div>
              <div className={`${showFilters ? "block" : "hidden lg:block"}`}>
                <ProductFilters onFiltersChange={handleFiltersChange} categories={mockCategories} />
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <ProductGrid products={currentProducts} loading={loading} />

            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
