const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Mock Data
let products = [
  {
    id: 1,
    title: "Attack on Titan Eren Yeager Figure",
    price: 89.99,
    description: "High-quality PVC figure of Eren Yeager from Attack on Titan. Standing 25cm tall with incredible detail and articulation.",
    image: "https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "figures",
    stock: 15,
    tags: ["attack-on-titan", "eren", "figure", "anime"]
  },
  {
    id: 2,
    title: "Demon Slayer Tanjiro Poster",
    price: 24.99,
    description: "Beautiful artwork poster featuring Tanjiro from Demon Slayer. Perfect for decorating your room or office.",
    image: "https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "posters",
    stock: 50,
    tags: ["demon-slayer", "tanjiro", "poster", "wall-art"]
  },
  {
    id: 3,
    title: "Naruto Kunai Keychain",
    price: 12.99,
    description: "Metal kunai keychain replica from Naruto series. Perfect accessory for any Naruto fan.",
    image: "https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "keychains",
    stock: 100,
    tags: ["naruto", "kunai", "keychain", "metal"]
  },
  {
    id: 4,
    title: "One Piece Luffy Figure",
    price: 75.99,
    description: "Premium figure of Monkey D. Luffy from One Piece in his Gear 4 form. Highly detailed and poseable.",
    image: "https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "figures",
    stock: 20,
    tags: ["one-piece", "luffy", "figure", "gear-4"]
  },
  {
    id: 5,
    title: "My Hero Academia All Might Poster",
    price: 19.99,
    description: "Dynamic poster featuring All Might from My Hero Academia. High-quality print on premium paper.",
    image: "https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "posters",
    stock: 75,
    tags: ["my-hero-academia", "all-might", "poster", "hero"]
  },
  {
    id: 6,
    title: "Dragon Ball Z Scouter Keychain",
    price: 15.99,
    description: "Replica scouter keychain from Dragon Ball Z. LED light functionality included.",
    image: "https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "keychains",
    stock: 60,
    tags: ["dragon-ball", "scouter", "keychain", "led"]
  }
];

let users = [];
let orders = [];
let nextOrderId = 1;

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Products
app.get('/api/products', (req, res) => {
  const { category, search, minPrice, maxPrice, page = 1, limit = 12 } = req.query;
  let filteredProducts = [...products];

  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json({
    products: paginatedProducts,
    total: filteredProducts.length,
    page: parseInt(page),
    totalPages: Math.ceil(filteredProducts.length / limit)
  });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Authentication
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      cart: []
    };

    users.push(user);
    
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Cart
app.get('/api/cart', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user.cart);
});

app.post('/api/cart/add', authenticateToken, (req, res) => {
  const { productId, quantity } = req.body;
  const user = users.find(u => u.id === req.user.userId);
  const product = products.find(p => p.id === productId);
  
  if (!user || !product) {
    return res.status(404).json({ error: 'User or product not found' });
  }

  const existingItem = user.cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    user.cart.push({ productId, quantity, product });
  }

  res.json(user.cart);
});

app.put('/api/cart/update', authenticateToken, (req, res) => {
  const { productId, quantity } = req.body;
  const user = users.find(u => u.id === req.user.userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const item = user.cart.find(item => item.productId === productId);
  if (item) {
    item.quantity = quantity;
  }

  res.json(user.cart);
});

app.delete('/api/cart/remove/:productId', authenticateToken, (req, res) => {
  const productId = parseInt(req.params.productId);
  const user = users.find(u => u.id === req.user.userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.cart = user.cart.filter(item => item.productId !== productId);
  res.json(user.cart);
});

// Orders
app.post('/api/orders', authenticateToken, (req, res) => {
  const { shippingAddress, items, total } = req.body;
  const user = users.find(u => u.id === req.user.userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const order = {
    id: nextOrderId++,
    userId: user.id,
    items,
    total,
    shippingAddress,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  
  // Clear user's cart
  user.cart = [];

  res.status(201).json(order);
});

app.get('/api/orders', authenticateToken, (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.user.userId);
  res.json(userOrders);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});