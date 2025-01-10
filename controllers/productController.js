const db = require('../config/database.js');

// CREATE
const createProduct = async (req, res) => {
  const { nama_produk, deskripsi, kategori, image, harga } = req.body;

  try {
    await db.promise().query(
      'INSERT INTO produk (nama_produk, deskripsi, image, kategori, harga) VALUES (?, ?, ?, ?, ?)',
      [nama_produk, deskripsi, image, kategori, harga]
    );
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

// READ
const getProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const [products] = await db.promise().query(
      'SELECT * FROM produk WHERE kategori = ?',
      [id]
    );
    if (products.length === 0) {
      return res.status(200).json([]); // Return empty array if no products
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
  }
};

// UPDATE
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nama_produk, deskripsi, kategori, image, harga } = req.body;

  try {
    const [product] = await db.promise().query(
      'SELECT * FROM produk WHERE produk_id = ?',
      [id]
    );

    if (product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await db.promise().query(
      'UPDATE produk SET nama_produk = ?, deskripsi = ?, image = ?, kategori = ?, harga = ? WHERE produk_id = ?',
      [nama_produk, deskripsi, image, kategori, harga, id]
    );

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [product] = await db.promise().query(
      'SELECT * FROM produk WHERE produk_id = ?',
      [id]
    );

    if (product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await db.promise().query('DELETE FROM produk WHERE produk_id = ?', [id]);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
module.exports = { createProduct, getProducts, updateProduct, deleteProduct };