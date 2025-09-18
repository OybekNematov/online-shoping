export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  category: string;
  description: string;
  features: string[];
  inStock: boolean;
  stockCount: number;
  seller: string;
  shipping: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.5,
    reviews: 234,
    category: 'Electronics',
    description: 'Premium wireless Bluetooth headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Wireless Bluetooth 5.0',
      'Premium sound quality',
      'Comfortable over-ear design'
    ],
    inStock: true,
    stockCount: 45,
    seller: 'TechGear Pro',
    shipping: 'Free shipping'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 249.99,
    originalPrice: 299.99,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.7,
    reviews: 567,
    category: 'Electronics',
    description: 'Advanced fitness tracking smartwatch with heart rate monitoring, GPS, and smartphone integration.',
    features: [
      'Heart rate monitoring',
      'GPS tracking',
      'Water resistant',
      '7-day battery life',
      'Sleep tracking'
    ],
    inStock: true,
    stockCount: 23,
    seller: 'FitTech Solutions',
    shipping: 'Free shipping'
  },
  {
    id: '3',
    name: 'Leather Backpack',
    price: 129.99,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.3,
    reviews: 89,
    category: 'Fashion',
    description: 'Handcrafted genuine leather backpack perfect for work, travel, and everyday use.',
    features: [
      'Genuine leather construction',
      'Multiple compartments',
      'Laptop compartment',
      'Adjustable straps',
      'Vintage design'
    ],
    inStock: true,
    stockCount: 15,
    seller: 'Leather Craft Co',
    shipping: '$5.99 shipping'
  },
  {
    id: '4',
    name: 'Portable Speaker',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://images.pexels.com/photos/1279813/pexels-photo-1279813.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1279813/pexels-photo-1279813.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.4,
    reviews: 156,
    category: 'Electronics',
    description: 'Compact wireless speaker with powerful sound and long-lasting battery.',
    features: [
      'Wireless connectivity',
      '12-hour battery',
      'Water resistant',
      'Compact design',
      'Rich bass'
    ],
    inStock: true,
    stockCount: 67,
    seller: 'AudioMax',
    shipping: 'Free shipping'
  },
  {
    id: '5',
    name: 'Yoga Mat Premium',
    price: 39.99,
    image: 'https://images.pexels.com/photos/4325484/pexels-photo-4325484.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/4325484/pexels-photo-4325484.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.6,
    reviews: 203,
    category: 'Sports',
    description: 'Professional-grade yoga mat with superior grip and comfort for all fitness levels.',
    features: [
      'Non-slip surface',
      'Eco-friendly material',
      'Extra thick padding',
      'Easy to clean',
      'Carrying strap included'
    ],
    inStock: true,
    stockCount: 32,
    seller: 'ZenFit',
    shipping: 'Free shipping'
  },
  {
    id: '6',
    name: 'Coffee Maker Deluxe',
    price: 189.99,
    originalPrice: 229.99,
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.8,
    reviews: 342,
    category: 'Home & Garden',
    description: 'Professional coffee maker with programmable settings and thermal carafe.',
    features: [
      'Programmable timer',
      'Thermal carafe',
      '12-cup capacity',
      'Auto shut-off',
      'Gold-tone filter'
    ],
    inStock: true,
    stockCount: 18,
    seller: 'BrewMaster',
    shipping: 'Free shipping'
  },
  {
    id: '7',
    name: 'Skincare Set',
    price: 89.99,
    image: 'https://images.pexels.com/photos/3685538/pexels-photo-3685538.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/3685538/pexels-photo-3685538.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.5,
    reviews: 124,
    category: 'Beauty',
    description: 'Complete skincare routine with cleanser, toner, serum, and moisturizer.',
    features: [
      'Natural ingredients',
      'Complete routine',
      'Suitable for all skin types',
      'Dermatologist tested',
      'Eco-friendly packaging'
    ],
    inStock: true,
    stockCount: 41,
    seller: 'Pure Beauty',
    shipping: 'Free shipping'
  },
  {
    id: '8',
    name: 'Gaming Keyboard',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.7,
    reviews: 289,
    category: 'Electronics',
    description: 'Mechanical gaming keyboard with RGB lighting and programmable keys.',
    features: [
      'Mechanical switches',
      'RGB backlighting',
      'Programmable keys',
      'Gaming optimized',
      'Durable construction'
    ],
    inStock: true,
    stockCount: 29,
    seller: 'GameTech Pro',
    shipping: 'Free shipping'
  }
];

// Extended mock data for better search and filtering
export const extendedMockProducts: Product[] = [
  ...mockProducts,
  {
    id: '9',
    name: 'Wireless Mouse',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.2,
    reviews: 156,
    category: 'Electronics',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
    features: [
      'Wireless connectivity',
      'Ergonomic design',
      'Precision tracking',
      'Long battery life',
      'Multiple buttons'
    ],
    inStock: true,
    stockCount: 78,
    seller: 'TechAccessories',
    shipping: 'Free shipping'
  },
  {
    id: '10',
    name: 'Running Shoes',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.6,
    reviews: 324,
    category: 'Sports',
    description: 'Lightweight running shoes with superior cushioning and breathable mesh upper.',
    features: [
      'Lightweight design',
      'Superior cushioning',
      'Breathable mesh',
      'Durable sole',
      'Comfortable fit'
    ],
    inStock: true,
    stockCount: 42,
    seller: 'SportGear',
    shipping: 'Free shipping'
  }
];

export const categories = [
  'All Categories',
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports',
  'Beauty',
  'Books',
  'Toys'
];