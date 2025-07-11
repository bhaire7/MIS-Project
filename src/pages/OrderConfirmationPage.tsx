import React, { useState, useEffect } from 'react';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';

interface Order {
  id: number;
  items: any[];
  total: number;
  status: string;
  shippingAddress: any;
  createdAt: string;
}

interface OrderConfirmationPageProps {
  orderId: number;
  onNavigate: (page: string) => void;
}

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ orderId, onNavigate }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching order details
    const mockOrder: Order = {
      id: orderId,
      items: [],
      total: 0,
      status: 'confirmed',
      shippingAddress: {},
      createdAt: new Date().toISOString()
    };
    
    setTimeout(() => {
      setOrder(mockOrder);
      setIsLoading(false);
    }, 1000);
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center mb-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for your purchase. Your order has been successfully placed and is being processed.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Order Number</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                #{orderId.toString().padStart(6, '0')}
              </p>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Order Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-white" size={20} />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900 dark:text-white">Order Confirmed</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <Package className="text-gray-600 dark:text-gray-400" size={20} />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-500 dark:text-gray-400">Processing</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We're preparing your order
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <Truck className="text-gray-600 dark:text-gray-400" size={20} />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-500 dark:text-gray-400">Shipped</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your order is on its way
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <Home className="text-gray-600 dark:text-gray-400" size={20} />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-500 dark:text-gray-400">Delivered</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Package delivered to your door
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              What's Next?
            </h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Order Processing</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We'll send you an email confirmation and prepare your items for shipment.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Shipping Notification</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You'll receive tracking information once your order ships.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Delivery</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your anime products will be delivered within 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate('products')}
              className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => onNavigate('orders')}
              className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              View All Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;