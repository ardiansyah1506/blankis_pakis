const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database.js');
const { OAuth2Client } = require('google-auth-library');
const dotenv = require('dotenv');
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(idToken) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  return ticket.getPayload();
}

const register = async (req, res) => {
  const { username, email, password, role, kategori } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    await db.promise().query(
      'INSERT INTO users (username, email, password, role, kategori) VALUES (?, ?, ?, ?, ?)',
      [username, email, hashedPassword, role, kategori]
    );

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error registering user', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { user_id: user.user_id, role: user.role, kategori: user.kategori },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ success: true, token, user_id: user.user_id, role: user.role, kategori: user.kategori });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in', error });
  }
};

const socialLogin = async (req, res) => {
  const { email, name, kategori, token } = req.body;

  try {
    const verifiedPayload = await verifyGoogleToken(token);

    const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    let userId;

    if (existingUser.length > 0) {
      userId = existingUser[0].user_id;
    } else {
      const placeholderPassword = await bcrypt.hash('social_placeholder', 10);
      const [result] = await db.promise().query(
        'INSERT INTO users (username, email, password, role, kategori) VALUES (?, ?, ?, ?, ?)',
        [name, email, placeholderPassword, 'user', kategori]
      );
      userId = result.insertId;
    }

    const jwtToken = jwt.sign(
      { user_id: userId, role: 'user', email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ success: true, token: jwtToken, user_id: userId, email });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error during social login', error });
  }
};


const updatePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    // Cari user berdasarkan email
    const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user = rows[0];

    // Verifikasi password lama
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    // Hash password baru
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password di database
    await db.promise().query('UPDATE users SET password = ? WHERE email = ?', [hashedNewPassword, email]);

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating password', error });
  }
};


module.exports = { register, login, socialLogin, updatePassword };

