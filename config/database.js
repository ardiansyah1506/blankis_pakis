const mysql = require('mysql2');
const dotenv = require('dotenv');

// Memuat file .env
dotenv.config();

// Buat koneksi pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Fungsi untuk mencoba koneksi ulang dengan pool
function connectWithRetry() {
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Failed to connect to database, retrying...', err);
      setTimeout(connectWithRetry, 5000); // Coba lagi setelah 5 detik
    } else {
      console.log('Connected to MySQL Database!');
      connection.release(); // Lepaskan koneksi setelah berhasil
    }
  });
}

// Mulai mencoba koneksi
connectWithRetry();

// Ubah export default menjadi module.exports
module.exports = db;
