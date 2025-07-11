import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AuthPage from './pages/AuthPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AboutPage from './pages/AboutPage';

// Helper wrappers for params
const ProductDetailWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return <ProductDetailPage productId={Number(id)} onNavigate={navigate} />;
};
const ProductsWrapper = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  return <ProductsPage onNavigate={navigate} searchParams={searchParams} />;
};
const BlogPostWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return <BlogPostPage postId={Number(id)} onNavigate={navigate} />;
};
const BlogWrapper = () => {
  const navigate = useNavigate();
  return <BlogPage onNavigate={navigate} />;
};
const CartWrapper = () => {
  const navigate = useNavigate();
  return <CartPage onNavigate={navigate} />;
};
const CheckoutWrapper = () => {
  const navigate = useNavigate();
  return <CheckoutPage onNavigate={navigate} />;
};
const AuthWrapper = () => {
  const navigate = useNavigate();
  return <AuthPage onNavigate={navigate} />;
};
const OrderConfirmationWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return <OrderConfirmationPage orderId={Number(id)} onNavigate={navigate} />;
};
const HomeWrapper = () => {
  const navigate = useNavigate();
  return <HomePage onNavigate={navigate} />;
};
const AboutWrapper = () => <AboutPage />;

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomeWrapper />} />
              <Route path="/home" element={<HomeWrapper />} />
              <Route path="/products" element={<ProductsWrapper />} />
              <Route path="/products/:id" element={<ProductDetailWrapper />} />
              <Route path="/cart" element={<CartWrapper />} />
              <Route path="/checkout" element={<CheckoutWrapper />} />
              <Route path="/about" element={<AboutWrapper />} />
              <Route path="/blog" element={<BlogWrapper />} />
              <Route path="/blog/:id" element={<BlogPostWrapper />} />
              <Route path="/auth" element={<AuthWrapper />} />
              <Route path="/order-confirmation/:id" element={<OrderConfirmationWrapper />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;