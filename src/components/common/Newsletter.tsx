import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setTimeout(() => {
        setIsSubscribed(true);
        showToast('success', 'Successfully subscribed to newsletter!');
        setEmail('');
      }, 1000);
    }
  };

  if (isSubscribed) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          Welcome to our newsletter!
        </h3>
        <p className="text-green-700">
          You'll receive the latest deals and updates in your inbox.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <Mail className="h-12 w-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Stay Updated with Best Deals</h3>
        <p className="text-blue-100 mb-6">
          Subscribe to our newsletter and never miss out on exclusive offers, new arrivals, and special discounts.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            required
          />
          <button
            type="submit"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Subscribe Now
          </button>
        </form>
        
        <p className="text-xs text-blue-200 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;