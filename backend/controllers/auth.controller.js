import { deleteTokenCookies, setTokenCookies } from '../utils/cookieUtils.js';
import authService from '../services/auth.service.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.signup(
      name,
      email,
      password
    );

    setTokenCookies(accessToken, refreshToken, res);

    res.status(201).json({ user, message: 'User created successfully' });
  } catch (error) {
    console.error('Error in signup controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const { user, accessToken, refreshToken } = await authService.login(
      email,
      password
    );

    setTokenCookies(accessToken, refreshToken, res);

    res.status(200).json({ user, message: 'Login successfully' });
  } catch (error) {
    console.error('Error in login controller: ', error.message);

    if (error.statusCode === 400) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    await authService.logout(refreshToken);

    deleteTokenCookies(res);

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error in logout controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const refreshTokens = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    const { newAccessToken, newRefreshToken } = await authService.refreshTokens(
      refreshToken
    );

    setTokenCookies(newAccessToken, newRefreshToken, res);
    return res.status(200).json({ message: 'Refreshed token successfully' });
  } catch (error) {
    console.error('Error in refreshtokens controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error('Error in getProfile controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
