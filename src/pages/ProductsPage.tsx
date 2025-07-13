import React, { useState, useEffect } from 'react';
import productsData from '../products.json';
import { Filter, Grid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  stars: number;
}

interface ProductsPageProps {
  onNavigate: (page: string) => void;
  searchParams?: URLSearchParams;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate, searchParams }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    category: searchParams?.get('category') || '',
    search: searchParams?.get('search') || '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'title'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let allProducts = productsData;
    const localProducts = localStorage.getItem('products');
    if (localProducts) {
      try {
        allProducts = [...productsData, ...JSON.parse(localProducts)];
      } catch {}
    }
    // Ensure all products have a 'stars' property
    allProducts = allProducts.map(p => ({ ...p, stars: typeof p.stars === 'number' ? p.stars : 5 }));
    let filtered = allProducts.map(p => ({ ...p, stars: typeof p.stars === 'number' ? p.stars : 5 }));
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.search) {
      filtered = filtered.filter(p => p.title.toLowerCase().includes(filters.search.toLowerCase()));
    }
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(filters.maxPrice));
    }
    const filteredWithStars = filtered.map(p => ({ ...p, stars: typeof p.stars === 'number' ? p.stars : 5 }));
    setProducts(filteredWithStars);
    setFilteredProducts(filteredWithStars);
    setIsLoading(false);
  }, [filters.category, filters.search, filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    let sorted = [...products];
    
    switch (filters.sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    
    setFilteredProducts(sorted);
  }, [products, filters.sortBy]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      search: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'title'
    });
  };

  const categories = ['figures', 'posters', 'keychains'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {filters.category ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}` : 'All Products'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredProducts.length} products found
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white dark:bg-black rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-white"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Min Price
                </label>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  placeholder="NRS 0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Price
                </label>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  placeholder="NRS 999"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-white"
                >
                  <option value="title">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-black rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearFilters}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;