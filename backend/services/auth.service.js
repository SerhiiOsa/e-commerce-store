import {
  decodeRefreshToken,
  generateTokens,
  getStoredToken,
  removeRefreshToken,
  storeRefreshToken,
} from '../helpers/authHelpers.js';
import User from '../models/user.model.js';

export default {
  async signup(name, email, password) {
    const user = await User.create({ name, email, password });

    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  },

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      const error = new Error('Invalid email or password');
      error.statusCode = 400;
      throw error;
    }

    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  },

  async logout(refreshToken) {
    const decoded = decodeRefreshToken(refreshToken);
    await removeRefreshToken(decoded.userId);
  },

  async refreshTokens(refreshToken) {
    const decoded = decodeRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const storedToken = await getStoredToken(decoded.userId);

    if (!storedToken || storedToken !== refreshToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      generateTokens(decoded.userId);

    await storeRefreshToken(decoded.userId, newRefreshToken);

    return { newAccessToken, newRefreshToken };
  },
};
