import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectMySQL from './config/mysql.js';           // Updated to MySQL
import connectCloudinary from './config/cloudinary.js';

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect to MySQL instead of MongoDB
connectMySQL();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Health check route
app.get('/', (req, res) => {
    res.send('API working with MySQL!');
});

// Start server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
