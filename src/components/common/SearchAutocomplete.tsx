import React, { useState, useEffect, useRef } from "react";
import { Product } from "../../utils/mockData";
import { Icon } from "../ui/Icon";

interface SearchAutocompleteProps {
  onSearch: (query: string) => void;
  onSelect: (product: Product) => void;
  products: Product[];
  placeholder?: string;
  className?: string;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  onSearch,
  onSelect,
  products,
  placeholder = "جستجو در محصولات...",
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = products.filter(
        (product) =>
          product.name_fa.toLowerCase().includes(query.toLowerCase()) ||
          product.name_en.toLowerCase().includes(query.toLowerCase()) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setSuggestions(filtered.slice(0, 5));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
    setSelectedIndex(-1);
  }, [query, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelect(suggestions[selectedIndex]);
        } else if (query.trim()) {
          onSearch(query.trim());
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelect = (product: Product) => {
    setQuery(product.name_fa);
    onSelect(product);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          autoComplete="off"
        />
        <button
          type="submit"
          className="mr-2 text-gray-400 hover:text-yellow-400 transition-colors duration-200">
          <Icon name="search" size={20} />
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          {suggestions.map((product, index) => (
            <div
              key={product.id}
              onClick={() => handleSelect(product)}
              className={`flex items-center p-3 cursor-pointer transition-colors duration-200 ${
                index === selectedIndex ? "bg-slate-700" : "hover:bg-slate-700"
              }`}>
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-700 flex-shrink-0">
                <img
                  src={product.images[0]}
                  alt={product.name_fa}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mr-3 flex-1">
                <h4 className="text-sm font-medium text-gray-300">{product.name_fa}</h4>
                <p className="text-xs text-gray-400">{product.name_en}</p>
                <div className="flex items-center mt-1">
                  <span className="text-sm font-semibold text-yellow-400">
                    {product.price.toLocaleString()} تومان
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through mr-2">
                      {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              <Icon name="chevron-left" size={16} className="text-gray-400" />
            </div>
          ))}

          {/* Show All Results */}
          <div
            onClick={() => {
              onSearch(query.trim());
              setIsOpen(false);
            }}
            className="flex items-center justify-center p-3 border-t border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors duration-200">
            <span className="text-sm text-yellow-400 font-medium">
              مشاهده همه نتایج برای "{query}"
            </span>
            <Icon name="search" size={16} className="text-yellow-400 mr-2" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
