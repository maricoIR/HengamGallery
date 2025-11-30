export interface Product {
  id: number;
  name_fa: string;
  name_en: string;
  price: number;
  originalPrice?: number;
  images: string[];
  tags: string[];
  stock: number;
  rating: number;
  reviews: number;
  description: string;
  specifications: {
    material: string;
    weight: string;
    dimensions: string;
    color: string;
  };
  variations?: {
    size?: string[];
    material?: string[];
    color?: string[];
  };
}

export interface InstagramPost {
  id: number;
  image: string;
  caption: string;
  link: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  selectedVariations?: {
    size?: string;
    material?: string;
    color?: string;
  };
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name_fa: "گردنبند طلای ۱۸ عیار",
    name_en: "18K Gold Necklace",
    price: 25000000,
    originalPrice: 30000000,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
    ],
    tags: ["طلای ۱۸ عیار", "گردنبند", "کلاسیک"],
    stock: 5,
    rating: 4.8,
    reviews: 24,
    description: "گردنبند زیبا و کلاسیک از طلای ۱۸ عیار با طراحی منحصر به فرد",
    specifications: {
      material: "طلای ۱۸ عیار",
      weight: "۱۵ گرم",
      dimensions: "۴۵ سانتی‌متر",
      color: "طلایی",
    },
    variations: {
      size: ["۴۰ سانتی‌متر", "۴۵ سانتی‌متر", "۵۰ سانتی‌متر"],
      material: ["طلای ۱۸ عیار", "طلای ۱۴ عیار"],
    },
  },
  {
    id: 2,
    name_fa: "دستبند نقره‌ای با نگین",
    name_en: "Silver Bracelet with Gemstone",
    price: 8500000,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
      "https://images.unsplash.com/photo-1617038220319-276d4f7b9b0e?w=400",
    ],
    tags: ["نقره", "دستبند", "نگین"],
    stock: 8,
    rating: 4.6,
    reviews: 18,
    description: "دستبند زیبا از نقره خالص با نگین‌های طبیعی",
    specifications: {
      material: "نقره ۹۲۵",
      weight: "۲۵ گرم",
      dimensions: "۱۸ سانتی‌متر",
      color: "نقره‌ای",
    },
    variations: {
      size: ["۱۶ سانتی‌متر", "۱۸ سانتی‌متر", "۲۰ سانتی‌متر"],
    },
  },
  {
    id: 3,
    name_fa: "انگشتر الماس",
    name_en: "Diamond Ring",
    price: 45000000,
    originalPrice: 50000000,
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
      "https://images.unsplash.com/photo-1596944924616-7b384c9e35d1?w=400",
    ],
    tags: ["الماس", "انگشتر", "لوکس"],
    stock: 2,
    rating: 4.9,
    reviews: 12,
    description: "انگشتر لوکس با الماس طبیعی و طلای ۱۸ عیار",
    specifications: {
      material: "طلای ۱۸ عیار + الماس",
      weight: "۸ گرم",
      dimensions: "سایز ۵۴",
      color: "طلایی",
    },
    variations: {
      size: ["سایز ۵۰", "سایز ۵۲", "سایز ۵۴", "سایز ۵۶"],
    },
  },
  {
    id: 4,
    name_fa: "گوشواره مروارید",
    name_en: "Pearl Earrings",
    price: 12000000,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
    ],
    tags: ["مروارید", "گوشواره", "کلاسیک"],
    stock: 6,
    rating: 4.7,
    reviews: 15,
    description: "گوشواره زیبا با مروارید طبیعی و طلای ۱۴ عیار",
    specifications: {
      material: "طلای ۱۴ عیار + مروارید",
      weight: "۶ گرم",
      dimensions: "۲ سانتی‌متر",
      color: "طلایی",
    },
  },
  {
    id: 5,
    name_fa: "ساعت مچی طلای ۱۸ عیار",
    name_en: "18K Gold Watch",
    price: 75000000,
    originalPrice: 85000000,
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400",
    ],
    tags: ["ساعت", "طلای ۱۸ عیار", "مردانه"],
    stock: 3,
    rating: 4.9,
    reviews: 8,
    description: "ساعت مچی لوکس مردانه از طلای ۱۸ عیار",
    specifications: {
      material: "طلای ۱۸ عیار",
      weight: "۱۲۰ گرم",
      dimensions: "۴۲ میلی‌متر",
      color: "طلایی",
    },
  },
  {
    id: 6,
    name_fa: "سرویس طلا زنانه",
    name_en: "Women's Gold Set",
    price: 95000000,
    images: [
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
    ],
    tags: ["سرویس", "طلای ۱۸ عیار", "زنانه"],
    stock: 1,
    rating: 5.0,
    reviews: 6,
    description: "سرویس کامل طلا شامل گردنبند، دستبند و گوشواره",
    specifications: {
      material: "طلای ۱۸ عیار",
      weight: "۸۵ گرم",
      dimensions: "متنوع",
      color: "طلایی",
    },
  },
];

export const mockInstagramPosts: InstagramPost[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300",
    caption: "گردنبند جدید مجموعه بهار",
    link: "https://instagram.com/p/example1",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=300",
    caption: "انگشتر الماس ویژه",
    link: "https://instagram.com/p/example2",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300",
    caption: "سرویس طلای کلاسیک",
    link: "https://instagram.com/p/example3",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300",
    caption: "دستبند نقره‌ای جدید",
    link: "https://instagram.com/p/example4",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=300",
    caption: "گوشواره مروارید",
    link: "https://instagram.com/p/example5",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300",
    caption: "ساعت مچی طلایی",
    link: "https://instagram.com/p/example6",
  },
];

export const mockCategories = [
  { id: 1, name: "گردنبند", slug: "necklaces" },
  { id: 2, name: "دستبند", slug: "bracelets" },
  { id: 3, name: "انگشتر", slug: "rings" },
  { id: 4, name: "گوشواره", slug: "earrings" },
  { id: 5, name: "ساعت", slug: "watches" },
  { id: 6, name: "سرویس", slug: "sets" },
];

export const mockUser = {
  id: 1,
  name: "احمد محمدی",
  email: "ahmad@example.com",
  phone: "09123456789",
  profileImage: null,
  addresses: [
    {
      id: 1,
      title: "خانه",
      address: "تهران، خیابان ولیعصر، پلاک ۱۲۳، طبقه ۲، واحد ۵",
      postalCode: "1234567890",
      city: "تهران",
      province: "تهران",
    },
    {
      id: 2,
      title: "محل کار",
      address: "تهران، خیابان آزادی، برج میلاد، طبقه ۱۵",
      postalCode: "0987654321",
      city: "تهران",
      province: "تهران",
    },
  ],
  orders: [
    {
      id: "ORD-001",
      date: "۱۴۰۳/۰۱/۱۵",
      status: "تحویل شده",
      total: 45000000,
      items: [
        {
          id: 1,
          name_fa: "گردنبند طلای ۱۸ عیار",
          price: 25000000,
          images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400"],
        },
        {
          id: 2,
          name_fa: "دستبند نقره‌ای با نگین",
          price: 20000000,
          images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400"],
        },
      ],
    },
    {
      id: "ORD-002",
      date: "۱۴۰۳/۰۱/۱۰",
      status: "در حال ارسال",
      total: 32000000,
      items: [
        {
          id: 3,
          name_fa: "انگشتر الماس",
          price: 32000000,
          images: ["https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400"],
        },
      ],
    },
  ],
};

export const mockApi = {
  getProducts: (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProducts), 500);
    });
  },

  getProduct: (id: number): Promise<Product | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = mockProducts.find((p) => p.id === id);
        resolve(product || null);
      }, 300);
    });
  },

  getInstagramPosts: (): Promise<InstagramPost[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockInstagramPosts), 400);
    });
  },

  addToCart: (_productId: number, _quantity: number = 1): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 200);
    });
  },

  removeFromCart: (_productId: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 200);
    });
  },

  updateCartQuantity: (_productId: number, _quantity: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 200);
    });
  },
};
