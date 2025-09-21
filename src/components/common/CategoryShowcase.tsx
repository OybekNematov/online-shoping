import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Category {
  name: string;
  image: string;
  productCount: string;
  featured: boolean;
  description: string;
}

const CategoryShowcase: React.FC = () => {
  const categories: Category[] = [
    {
      name: 'Electronics',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600',
      productCount: '2,345',
      featured: true,
      description: 'Latest gadgets and tech accessories'
    },
    {
      name: 'Fashion',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600',
      productCount: '1,876',
      featured: true,
      description: 'Trendy clothing and accessories'
    },
    {
      name: 'Home & Garden',
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600',
      productCount: '987',
      featured: false,
      description: 'Everything for your home and garden'
    },
    {
      name: 'Sports & Fitness',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=600',
      productCount: '654',
      featured: false,
      description: 'Gear up for your active lifestyle'
    },
    {
      name: 'Beauty & Health',
      image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=600',
      productCount: '789',
      featured: true,
      description: 'Beauty products and health essentials'
    },
    {
      name: 'Books & Media',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
      productCount: '432',
      featured: false,
      description: 'Books, movies, and digital content'
    }
  ];

  const featuredCategories = categories.filter(cat => cat.featured);
  const regularCategories = categories.filter(cat => !cat.featured);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of products across different categories, 
            carefully curated to meet all your shopping needs.
          </p>
        </div>

        {/* Featured Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {featuredCategories.map((category, index) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-200 mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    {category.productCount} products
                  </span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Regular Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {regularCategories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-10 mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{category.productCount} items</span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;