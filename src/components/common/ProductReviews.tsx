import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: string;
  reviews?: Review[];
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, reviews = [] }) => {
  const { user } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: ''
  });

  // Mock reviews data
  const mockReviews: Review[] = [
    {
      id: '1',
      userId: '1',
      userName: 'John D.',
      rating: 5,
      title: 'Excellent product!',
      comment: 'Great quality and fast delivery. Exactly as described and works perfectly. Would definitely recommend to others.',
      date: '2024-01-15',
      helpful: 12,
      verified: true
    },
    {
      id: '2',
      userId: '2',
      userName: 'Sarah M.',
      rating: 4,
      title: 'Good value for money',
      comment: 'Nice product overall. The quality is good for the price point. Shipping was quick and packaging was secure.',
      date: '2024-01-10',
      helpful: 8,
      verified: true
    },
    {
      id: '3',
      userId: '3',
      userName: 'Mike R.',
      rating: 3,
      title: 'Average quality',
      comment: 'It\'s okay, but not exceptional. Does what it\'s supposed to do but could be better quality for the price.',
      date: '2024-01-05',
      helpful: 3,
      verified: false
    }
  ];

  const allReviews = reviews.length > 0 ? reviews : mockReviews;
  const averageRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
  
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: allReviews.filter(review => review.rating === rating).length,
    percentage: (allReviews.filter(review => review.rating === rating).length / allReviews.length) * 100
  }));

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit to your API
    console.log('Submitting review:', newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 5, title: '', comment: '' });
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(averageRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">{allReviews.length} reviews</p>
          </div>
          
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-2">
                <span className="text-sm w-8">{rating}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      {user && (
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Customer Reviews</h3>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Write a Review
          </button>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="bg-white border rounded-lg p-6 space-y-4">
          <h4 className="text-lg font-semibold">Write Your Review</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating })}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      rating <= newReview.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review Title
            </label>
            <input
              type="text"
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Summarize your review"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Share your experience with this product"
              required
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Review
            </button>
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {allReviews.map((review) => (
          <div key={review.id} className="bg-white border rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium">{review.userName}</span>
                  {review.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <h4 className="font-semibold mb-2">{review.title}</h4>
            <p className="text-gray-700 mb-4">{review.comment}</p>
            
            <div className="flex items-center space-x-4 text-sm">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                <ThumbsUp className="h-4 w-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors">
                <ThumbsDown className="h-4 w-4" />
                <span>Not helpful</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;