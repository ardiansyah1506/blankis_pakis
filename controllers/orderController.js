const db = require('../config/database.js');

 const checkout = async (req, res) => {
  const {
    user_id,
    province,
    city,
    address,
    shipping_cost,
    payment_proof,
    total_price,
    cart_items,
  } = req.body;

  try {
    console.log(req.body);

    const [orderResult] = await db.promise().query(
      `INSERT INTO orders
        (user_id, province, city, address, shipping_cost, payment_proof,total_price)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, province, city, address, shipping_cost, payment_proof, total_price]
    );

    const orderId = orderResult.insertId;

    const orderDetailsData = cart_items.map((item) => [
      orderId,
      item.product_id,
      item.quantity,
      item.price,
    ]);

    const placeholders = orderDetailsData.map(() => `(?, ?, ?, ?)`).join(', ');
    const orderDetailsQuery = `
      INSERT INTO order_details (order_id, product_id, quantity, price)
      VALUES ${placeholders};
    `;

    const flattenedData = orderDetailsData.flat();

    await db.promise().query(orderDetailsQuery, flattenedData);
    await db.promise().query('DELETE FROM cart WHERE user_id = ?', [user_id]);

    res.status(201).json({
      message: 'Checkout successful',
      orderId: orderId,
    });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: 'Error during checkout', error });
  }
};

 const getOrderHistory = async (req, res) => {
  const { user_id } = req.params;

  try {
    const [orders] = await db.promise().query(
      `SELECT
         o.order_id,
         o.province,
         o.city,
         o.address,
         o.shipping_cost,
         o.payment_proof,
         o.total_price,
         o.order_date
       FROM orders o
       WHERE o.user_id = ?`,
      [user_id]
    );

    const orderHistory = [];
    for (const order of orders) {
      const [details] = await db.promise().query(
        `SELECT d.product_id, p.nama_produk, d.quantity, d.price
         FROM order_details d
         JOIN produk p ON d.product_id = p.produk_id
         WHERE d.order_id = ?`,
        [order.order_id]
      );

      orderHistory.push({
        ...order,
        details,
      });
    }

    res.json(orderHistory);
  } catch (error) {
    console.error('Error retrieving order history:', error);
    res.status(500).json({ message: 'Error retrieving order history', error });
  }
};

const getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query; // Ambil tanggal awal dan akhir dari query parameter

    let dateCondition = '';

    // Periksa apakah `startDate` dan `endDate` tersedia
    if (startDate && endDate) {
     dateCondition = `WHERE DATE(o.order_date) BETWEEN ? AND ?`;
    }

    const [sales] = await db.promise().query(
      `SELECT 
         d.product_id,
         p.nama_produk AS product_name,
         SUM(d.quantity) AS total_quantity,
         SUM(d.price * d.quantity) AS total_sales
       FROM order_details d
       JOIN produk p ON d.product_id = p.produk_id
       JOIN orders o ON d.order_id = o.order_id
       ${dateCondition}
       GROUP BY d.product_id, p.nama_produk`,
      startDate && endDate ? [startDate, endDate] : [] // Berikan parameter jika ada
    );

    res.json({ sales });
  } catch (error) {
    console.error('Error retrieving sales report:', error);
    res.status(500).json({ message: 'Error retrieving sales report', error });
  }
};



 const getTransactionReport = async (req, res) => {
  try {
    const [transactions] = await db.promise().query(
      `SELECT 
         o.order_id,
         u.username AS customer_name,
         o.province,
         o.city,
         o.address,
         o.shipping_cost,
         o.payment_proof,
         o.total_price,
         o.order_date
       FROM orders o
       JOIN users u ON o.user_id = u.user_id`
    );

    res.json({ transactions });
  } catch (error) {
    console.error('Error retrieving transaction report:', error);
    res.status(500).json({ message: 'Error retrieving transaction report', error });
  }
};

 const getUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const [users] = await db.promise().query(
      `SELECT 
         user_id, 
         username, 
         email, 
         kategori,
         role
       FROM users 
       WHERE role != 'admin' AND kategori = ?`,
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found or not allowed to access' });
    }

    res.json({ users });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};

module.exports = { checkout, getOrderHistory, getTransactionReport, getSalesReport, getUsers };