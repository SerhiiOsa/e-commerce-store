import { deleteTokenCookies, setTokenCookies } from '../utils/cookieUtils.js';
import authService from '../services/auth.service.js';
import { asyncHandler } from './asyncHandler.js';

export const signup = asyncHandler(async function signup(req, res) {
  const { name, email, password } = req.body;
  const { user, accessToken, refreshToken } = await authService.signup(
    name,
    email,
    password
  );

  setTokenCookies(accessToken, refreshToken, res);

  res.status(201).json({ user, message: 'User created successfully' });
});

export const login = asyncHandler(async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error('All fields are required');
    error.statusCode = 400;
    throw error;
  }

  const { user, accessToken, refreshToken } = await authService.login(
    email,
    password
  );

  setTokenCookies(accessToken, refreshToken, res);

  res.status(200).json({ user, message: 'Login successfully' });
});

export const logout = asyncHandler(async function logout(req, res) {
  const refreshToken = req.cookies.refreshToken;
  await authService.logout(refreshToken);

  deleteTokenCookies(res);

  res.status(200).json({ message: 'Logged out successfully' });
});

export const refreshTokens = asyncHandler(async function refreshTokens(
  req,
  res
) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  const { newAccessToken, newRefreshToken } = await authService.refreshTokens(
    refreshToken
  );

  setTokenCookies(newAccessToken, newRefreshToken, res);
  return res.status(200).json({ message: 'Refreshed token successfully' });
});

export const getProfile = asyncHandler(async function getProfile(req, res) {
  res.status(200).json(req.user);
});
