import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import productsData from '../products.json';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  tags: string[];
}

interface ProductDetailPageProps {
  productId: number;
  onNavigate: (page: string) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, onNavigate }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    let allProducts = productsData;
    const localProducts = localStorage.getItem('products');
    if (localProducts) {
      try {
        allProducts = [...productsData, ...JSON.parse(localProducts)];
      } catch {}
    }
    // Ensure all products have a 'stars' property (for compatibility)
    allProducts = allProducts.map(p => ({ ...p, stars: typeof p.stars === 'number' ? p.stars : 5 }));
    const found = allProducts.find((p) => p.id === productId);
    setProduct(found || null);
    setIsLoading(false);
  }, [productId]);

  const handleAddToCart = async () => {
    if (!user) {
      onNavigate('auth');
      return;
    }
    if (product) {
      await addToCart(product.id, quantity);
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      onNavigate('auth');
      return;
    }
    if (product) {
      await addToCart(product.id, quantity);
      onNavigate('cart');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h2>
          <button
            onClick={() => onNavigate('products')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }
  console.log(product.image);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-purple-600 dark:hover:text-purple-400">
                Home
              </button>
            </li>
            <li>/</li>
            <li>
              <button onClick={() => onNavigate('products')} className="hover:text-purple-600 dark:hover:text-purple-400">
                Products
              </button>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
              <img
                src={
                  product.image.startsWith('http')
                    ? product.image
                    : product.image.startsWith('src/')
                      ? `/images/${product.image.split('/').pop()}`
                      : product.image
                }
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>
                {product.stock < 10 && (
                  <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm">
                    Only {product.stock} left
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">(4.0) • 127 reviews</span>
              </div>

              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-6">
                NRS {product.price}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quantity:
                </label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-900 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Buy Now
                </button>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isWishlisted
                      ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                  <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Truck className="text-purple-600 dark:text-purple-400" size={20} />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Free Shipping</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Orders over NRS 6700</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="text-purple-600 dark:text-purple-400" size={20} />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Secure Payment</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">100% secure</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="text-purple-600 dark:text-purple-400" size={20} />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Easy Returns</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">30 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;