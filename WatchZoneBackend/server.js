const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve the uploads directory
app.use(express.static('public')); // Serve static files from the public directory

// MongoDB connection
const uri = process.env.MONGODB_URI; // Ensure your connection string is set in .env
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Save files to the uploads directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Create unique filename
    }
});

const upload = multer({ storage: storage });

// Serve the HTML form for adding a product
app.get('/add-product', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add-product.html'));
});

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    imageUrl: String,
    description: String,
});

// Product Model
const Product = mongoose.model('Product', productSchema);

// Route to Add Product (POST)
app.post('/api/products', upload.single('image'), async (req, res) => {
    const { name, price, description } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

    try {
        const newProduct = new Product({ name, price, imageUrl, description });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error saving product:', err); // Log the error for debugging
        res.status(500).json({ message: 'Failed to add product' });
    }
});

// Route to Retrieve Products (GET)
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve products' });
    }
});

// User schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Signup endpoint
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error. Please try again.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
