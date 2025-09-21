import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Review = Database['public']['Tables']['reviews']['Row'];
type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];

export class ReviewService {
  static async getProductReviews(productId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        users (name)
      `)
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch reviews: ${error.message}`);
    }

    return data || [];
  }

  static async createReview(review: ReviewInsert) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create review: ${error.message}`);
    }

    // Update product rating
    await this.updateProductRating(review.product_id);

    return data;
  }

  static async updateProductRating(productId: string) {
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select('rating')
      .eq('product_id', productId);

    if (reviewsError) {
      throw new Error(`Failed to fetch reviews for rating update: ${reviewsError.message}`);
    }

    if (reviews && reviews.length > 0) {
      const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      
      const { error: updateError } = await supabase
        .from('products')
        .update({ 
          rating: Math.round(averageRating * 10) / 10,
          reviews_count: reviews.length 
        })
        .eq('id', productId);

      if (updateError) {
        throw new Error(`Failed to update product rating: ${updateError.message}`);
      }
    }
  }

  static async getUserReview(userId: string, productId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch user review: ${error.message}`);
    }

    return data;
  }

  static async deleteReview(reviewId: string) {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (error) {
      throw new Error(`Failed to delete review: ${error.message}`);
    }
  }
}