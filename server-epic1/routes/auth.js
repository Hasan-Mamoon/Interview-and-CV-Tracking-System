import express from 'express';
import { compare } from 'bcrypt';
import { user } from '../models/user.js'; // Ensure the correct import of the User model

import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
const TOKEN_EXPIRATION = '2m'; // Token expiration time
const REFRESH_TOKEN_EXPIRATION = '3d'; // Refresh token expiration time

// Login endpoint
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const User = await user.findOne({ email });
    if (!User) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await compare(password, User.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = sign({ email: User.email,firstname: User.firstname,lastname:User.lastname, role: User.role }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
    const refreshToken = sign({ email: User.email,firstname: User.firstname,lastname:User.lastname, role: User.role }, REFRESH_SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRATION });

    // Store refresh token on the server (e.g., in a database or in-memory store)
    // For simplicity, we'll use an in-memory store here
    // User.refreshToken = refreshToken;
    // await User.save();

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.status(200).json({ message: 'Signed in successfully',User: { email: User.email, firstname: User.firstname,lastname:User.lastname, role: User.role } });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Token validation endpoint
router.post('/validate-token', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = verify(token, SECRET_KEY);
    res.status(200).json({ user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Refresh token endpoint
router.post('/refresh-token', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }
  try {
    const decoded = verify(refreshToken, REFRESH_SECRET_KEY);
    const User = await user.findOne({ email: decoded.email });
    if (!User || User.refreshToken !== refreshToken) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const newToken = sign({ email: User.email,firstname: User.firstname,lastname:User.lastname, role: User.role }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
    res.cookie('token', newToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.status(200).json({ message: 'Token refreshed successfully' });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router as authRouter };