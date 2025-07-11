import React, { useState, useEffect } from 'react';
import { Calendar, User, Clock, Tag, ArrowLeft, Share2, Heart } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  image: string;
  tags: string[];
  category: string;
}

interface BlogPostPageProps {
  postId: number;
  onNavigate: (page: string) => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ postId, onNavigate }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  // Mock blog post data
  const mockPost: BlogPost = {
    id: postId,
    title: "Top 10 Must-Have Anime Figures of 2024",
    content: `
      <p>The world of anime figure collecting has never been more exciting than it is in 2024. With incredible attention to detail, innovative manufacturing techniques, and beloved characters from both classic and contemporary series, this year's releases are truly spectacular.</p>
      
      <h2>What Makes a Great Anime Figure?</h2>
      <p>Before diving into our top picks, let's discuss what separates exceptional figures from the rest. Quality anime figures should have:</p>
      <ul>
        <li>Exceptional attention to detail in sculpting and painting</li>
        <li>High-quality materials that ensure longevity</li>
        <li>Accurate representation of the character's design</li>
        <li>Stable construction and proper balance</li>
        <li>Value for money considering the craftsmanship</li>
      </ul>
      
      <h2>Our Top 10 Picks for 2024</h2>
      
      <h3>1. Attack on Titan - Levi Ackerman (1/7 Scale)</h3>
      <p>This stunning figure captures Levi in his iconic Survey Corps uniform, complete with ODM gear and dual blades. The dynamic pose and incredible detail work make this a must-have for any Attack on Titan fan.</p>
      
      <h3>2. Demon Slayer - Tanjiro Kamado (1/8 Scale)</h3>
      <p>Featuring Tanjiro mid-battle with his Nichirin sword, this figure showcases the beautiful water breathing effects with translucent blue elements that create a truly mesmerizing display.</p>
      
      <h3>3. Jujutsu Kaisen - Satoru Gojo (1/7 Scale)</h3>
      <p>Gojo's figure comes with his signature blindfold and an optional unmasked head, allowing collectors to display him in different ways. The attention to his uniform details is remarkable.</p>
      
      <h2>Collecting Tips for Beginners</h2>
      <p>If you're new to anime figure collecting, here are some essential tips:</p>
      <ul>
        <li>Start with characters you truly love</li>
        <li>Research the manufacturer's reputation</li>
        <li>Check reviews and photos from other collectors</li>
        <li>Consider your display space before purchasing</li>
        <li>Set a budget and stick to it</li>
      </ul>
      
      <h2>Where to Buy</h2>
      <p>Always purchase from reputable retailers to avoid counterfeit figures. Some trusted sources include official anime merchandise stores, established online retailers, and authorized local dealers.</p>
      
      <p>The anime figure market continues to grow and evolve, offering collectors incredible pieces that celebrate their favorite characters and series. Whether you're a seasoned collector or just starting out, 2024 has something amazing to offer everyone.</p>
    `,
    author: "Sakura Tanaka",
    publishedAt: "2024-01-15",
    readTime: 8,
    image: "https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["figures", "collecting", "2024", "recommendations"],
    category: "Reviews"
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPost(mockPost);
      setIsLoading(false);
    }, 1000);
  }, [postId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post not found</h2>
          <button
            onClick={() => onNavigate('blog')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('blog')}
          className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Blog</span>
        </button>

        <article className="max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="relative mb-8 rounded-lg overflow-hidden shadow-lg">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center space-x-2">
                <User size={18} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={18} />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                >
                  <Tag size={14} />
                  <span>#{tag}</span>
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pb-6 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isLiked
                    ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Heart size={18} className={isLiked ? 'fill-current' : ''} />
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              color: 'inherit',
            }}
          />

          {/* Related Posts CTA */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Enjoyed this article?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Check out more anime collecting guides and reviews on our blog
            </p>
            <button
              onClick={() => onNavigate('blog')}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Read More Articles
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostPage;