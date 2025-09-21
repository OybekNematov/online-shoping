import React, { useState } from 'react';
import { Clock, Flame, Zap, Gift } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { mockProducts } from '../data/mockData';

const DealsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('flash');

  // Mock deals data
  const flashDeals = mockProducts.filter(p => p.originalPrice).slice(0, 8);
  const dailyDeals = mockProducts.slice(2, 10);
  const weeklyDeals = mockProducts.slice(4, 12);

  const dealCategories = [
    { id: 'flash', name: 'Flash Deals', icon: Zap, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { id: 'daily', name: 'Daily Deals', icon: Flame, color: 'text-red-600', bgColor: 'bg-red-100' },
    { id: 'weekly', name: 'Weekly Specials', icon: Gift, color: 'text-purple-600', bgColor: 'bg-purple-100' }
  ];

  const getCurrentDeals = () => {
    switch (activeCategory) {
      case 'flash': return flashDeals;
      case 'daily': return dailyDeals;
      case 'weekly': return weeklyDeals;
      default: return flashDeals;
    }
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    
    const diff = endOfDay.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              🔥 Hot Deals & Offers
            </h1>
            <p className="text-xl mb-8 text-red-100">
              Limited time offers you don't want to miss!
            </p>
            
            {/* Countdown Timer */}
            <div className="bg-white bg-opacity-20 rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Clock className="h-6 w-6" />
                <span className="text-lg font-semibold">Deals end in:</span>
              </div>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <div className="bg-white text-red-600 rounded-lg p-3 font-bold text-2xl min-w-[60px]">
                    {timeRemaining.hours.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm mt-1">Hours</div>
                </div>
                <div className="text-center">
                  <div className="bg-white text-red-600 rounded-lg p-3 font-bold text-2xl min-w-[60px]">
                    {timeRemaining.minutes.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm mt-1">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="bg-white text-red-600 rounded-lg p-3 font-bold text-2xl min-w-[60px]">
                    {timeRemaining.seconds.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm mt-1">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Deal Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {dealCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeCategory === category.id
                    ? `${category.bgColor} ${category.color} shadow-md`
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Deals Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {dealCategories.find(c => c.id === activeCategory)?.name}
            </h2>
            <div className="text-sm text-gray-600">
              {getCurrentDeals().length} deals available
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getCurrentDeals().map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                {activeCategory === 'flash' && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold animate-pulse">
                    ⚡ FLASH
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Special Offers Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">🎁 Special Offer Alert!</h3>
          <p className="text-lg mb-6">
            Get an extra 10% off on orders above $100. Use code: <span className="bg-white text-blue-600 px-3 py-1 rounded font-bold">SAVE10</span>
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>

        {/* Deal Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-6 text-white">
            <Zap className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Flash Sales</h3>
            <p className="text-yellow-100 mb-4">Lightning deals that disappear fast</p>
            <div className="text-2xl font-bold">Up to 70% OFF</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-lg p-6 text-white">
            <Flame className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Daily Deals</h3>
            <p className="text-red-100 mb-4">New deals every day</p>
            <div className="text-2xl font-bold">Up to 50% OFF</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg p-6 text-white">
            <Gift className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Weekly Specials</h3>
            <p className="text-purple-100 mb-4">Curated deals for the week</p>
            <div className="text-2xl font-bold">Up to 40% OFF</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsPage;