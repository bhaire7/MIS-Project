import React, { useState, useEffect } from 'react';
import { Star, Truck, Shield, RotateCcw, Calendar, User, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import productsData from '../products.json';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  stars: number;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: number;
  image: string;
  category: string;
}

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBlogLoading, setIsBlogLoading] = useState(true);

  // Dynamically import all blog images from src/img/Blog
  const blogImages = import.meta.glob('../img/Blog/*', { eager: true, as: 'url' });

  useEffect(() => {
    setFeaturedProducts(productsData.slice(0, 6));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/src/blogs.json');
        const data: BlogPost[] = await response.json();
        // Map image paths to imported URLs if they are local
        const resolvedPosts = data.map(post => {
          let imageUrl = post.image;
          if (imageUrl.startsWith('src/img/Blog/')) {
            // Remove 'src/' and prepend '../' to match import.meta.glob keys
            const key = '../' + imageUrl.slice(4);
            if (blogImages[key]) {
              imageUrl = blogImages[key];
            }
          }
          return { ...post, image: imageUrl };
        });
        setBlogPosts(resolvedPosts);
        setIsBlogLoading(false);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        setIsBlogLoading(false);
      }
    };
    fetchBlogPosts();
  }, []);

  const categories = [
    {
      name: 'Figures',
      image: 'src/img/home1.jpg',
      category: 'figures'
    },
    {
      name: 'Posters',
      image: 'src/img/home2.jpg',
      category: 'posters'
    },
    {
      name: 'Keychains',
      image: 'src/img/home3.jpg',
      category: 'keychains'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Your Ultimate Anime Store
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover amazing anime figures, posters, and collectibles from your favorite series
            </p>
            <button
              onClick={() => onNavigate('products')}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105 inline-block"
            >
              Shop Now
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-black to-transparent"></div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                onClick={() => onNavigate(`products?category=${category.category}`)}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Featured Products
          </h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Latest from Our Blog
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Stay updated with anime news, reviews, and collecting guides
              </p>
            </div>
            <button
              onClick={() => onNavigate('blog')}
              className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
            >
              <span>View All Posts</span>
              <ArrowRight size={20} />
            </button>
          </div>
          
          {isBlogLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-gray-50 dark:bg-neutral-900 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => onNavigate(`blog/${post.id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Free Shipping</h3>
              <p className="text-gray-600 dark:text-gray-400">Free shipping on all orders over NRS 6700</p>
            </div>
            <div className="text-center bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Secure Payment</h3>
              <p className="text-gray-600 dark:text-gray-400">Your payment information is safe with us</p>
            </div>
            <div className="text-center bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Easy Returns</h3>
              <p className="text-gray-600 dark:text-gray-400">30-day return policy on all items</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">Get notified about new arrivals and exclusive deals</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-white text-purple-600 px-6 py-3 rounded-r-lg hover:bg-gray-100 transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;