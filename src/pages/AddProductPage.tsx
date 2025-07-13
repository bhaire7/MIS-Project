import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialProduct = {
  title: '',
  price: '',
  description: '',
  image: '',
  category: '',
  stock: '',
  tags: '',
  stars: 5,
};

const AddProductPage: React.FC = () => {
  const [product, setProduct] = useState(initialProduct);
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({ ...prev, image: reader.result as string }));
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Get products from localStorage or empty array
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const newProduct = {
      ...product,
      id: Date.now(),
      price: Number(product.price),
      stock: Number(product.stock),
      tags: product.tags.split(',').map((t) => t.trim()),
      stars: Number(product.stars),
    };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center py-12 px-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-black rounded-2xl shadow-2xl p-10 max-w-lg w-full space-y-6">
        <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-4">Add New Product</h1>
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={product.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-white"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-white"
        />
        <input
          type="number"
          name="price"
          placeholder="Price (NRS)"
          value={product.price}
          onChange={handleChange}
          required
          min={0}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-white"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          required
          min={0}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-white"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-white"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={product.tags}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-white"
        />
        <input
          type="number"
          name="stars"
          placeholder="Stars (1-5)"
          value={product.stars}
          onChange={handleChange}
          min={1}
          max={5}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-white"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-lg mx-auto" />
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage; 