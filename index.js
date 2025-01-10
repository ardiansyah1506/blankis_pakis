const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');

dotenv.config(); // Memuat variabel lingkungan dari file .env

const app = express();
const port = process.env.PORT || 3000; // Gunakan PORT dari .env atau default ke 3000

// Middleware
app.use(cors()); // Mengizinkan akses dari semua origin
app.use(express.json()); // Parsing JSON payload

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/order', orderRoutes);

// Default route untuk testing
app.get('/', (req, res) => {
  res.send('Backend berjalan di Vercel');
});

// Start server hanya untuk lokal
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// Ubah export default menjadi module.exports
module.exports = app;
