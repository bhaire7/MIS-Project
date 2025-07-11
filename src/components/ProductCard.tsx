import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  stars: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate('/auth');
      return;
    }
    await addToCart(product.id, 1);
  };

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden ${product.stock === 0 ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={() => { if (product.stock > 0) navigate(`/products/${product.id}`); }}
      tabIndex={product.stock === 0 ? -1 : 0}
      aria-disabled={product.stock === 0}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {product.category}
        </div>
        {product.stock === 0 && (
          <div className="absolute top-2 left-2 bg-gray-700 text-white px-2 py-1 rounded text-xs opacity-90">
            Out of Stock
          </div>
        )}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
            Only {product.stock} left
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < product.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">({product.stars}.0)</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
            NRS {product.price}
          </span>
          
          <button
            onClick={handleAddToCart}
            className={`bg-purple-600 text-white p-2 rounded-lg transition-colors transform hover:scale-105 ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
            disabled={product.stock === 0}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;