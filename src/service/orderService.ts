import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderInsert = Database['public']['Tables']['orders']['Insert'];
type OrderItem = Database['public']['Tables']['order_items']['Row'];
type OrderItemInsert = Database['public']['Tables']['order_items']['Insert'];

export interface CreateOrderData {
  user_id: string;
  items: {
    product_id: string;
    quantity: number;
    price: number;
  }[];
  shipping_address: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  total_amount: number;
}

export class OrderService {
  static async createOrder(orderData: CreateOrderData) {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: orderData.user_id,
        total_amount: orderData.total_amount,
        shipping_address: orderData.shipping_address,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) {
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    // Create order items
    const orderItems: OrderItemInsert[] = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      throw new Error(`Failed to create order items: ${itemsError.message}`);
    }

    return order;
  }

  static async getOrderById(id: string) {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (*)
        )
      `)
      .eq('id', id)
      .single();

    if (orderError) {
      throw new Error(`Failed to fetch order: ${orderError.message}`);
    }

    return order;
  }

  static async getUserOrders(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch user orders: ${error.message}`);
    }

    return data || [];
  }

  static async updateOrderStatus(
    orderId: string, 
    status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  ) {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        status, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update order status: ${error.message}`);
    }

    return data;
  }

  static async getAllOrders(limit = 50, offset = 0) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        users (name, email),
        order_items (
          *,
          products (title)
        )
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }

    return data || [];
  }

  static async getOrderStats() {
    const { data: totalOrders, error: totalError } = await supabase
      .from('orders')
      .select('id', { count: 'exact' });

    const { data: todayOrders, error: todayError } = await supabase
      .from('orders')
      .select('id', { count: 'exact' })
      .gte('created_at', new Date().toISOString().split('T')[0]);

    const { data: revenue, error: revenueError } = await supabase
      .from('orders')
      .select('total_amount')
      .eq('status', 'delivered');

    if (totalError || todayError || revenueError) {
      throw new Error('Failed to fetch order statistics');
    }

    const totalRevenue = revenue?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

    return {
      totalOrders: totalOrders?.length || 0,
      todayOrders: todayOrders?.length || 0,
      totalRevenue
    };
  }
}