import React from 'react';
import { TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react';

interface SalesData {
  month: string;
  sales: number;
  revenue: number;
}

const SalesChart: React.FC = () => {
  // Mock data - in a real app, this would come from your analytics service
  const salesData: SalesData[] = [
    { month: 'Jan', sales: 120, revenue: 15600 },
    { month: 'Feb', sales: 150, revenue: 19500 },
    { month: 'Mar', sales: 180, revenue: 23400 },
    { month: 'Apr', sales: 220, revenue: 28600 },
    { month: 'May', sales: 190, revenue: 24700 },
    { month: 'Jun', sales: 250, revenue: 32500 }
  ];

  const maxSales = Math.max(...salesData.map(d => d.sales));
  const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0);
  const totalSales = salesData.reduce((sum, d) => sum + d.sales, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Sales Overview</h3>
        <TrendingUp className="h-5 w-5 text-green-600" />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <ShoppingCart className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-blue-600">Total Sales</p>
              <p className="text-2xl font-bold text-blue-900">{totalSales}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-green-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-900">${totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-purple-600">Avg. Order Value</p>
              <p className="text-2xl font-bold text-purple-900">${Math.round(totalRevenue / totalSales)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Bar Chart */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Monthly Sales</h4>
        <div className="space-y-3">
          {salesData.map((data, index) => (
            <div key={data.month} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">
                {data.month}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-6 rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                  style={{ width: `${(data.sales / maxSales) * 100}%` }}
                >
                  <span className="text-white text-xs font-medium">
                    {data.sales}
                  </span>
                </div>
              </div>
              <div className="w-20 text-sm text-gray-600 text-right">
                ${data.revenue.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Growth Rate</span>
          <span className="text-green-600 font-medium">+12.5% vs last period</span>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;