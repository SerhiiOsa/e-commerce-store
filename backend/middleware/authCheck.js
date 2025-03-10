import { decodeAccessToken } from '../helpers/authHelpers.js';
import User from '../models/user.model.js';

const authCheck = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res
        .status(401)
        .json({ message: 'Unauthorised: No token provided' });
    }

    const decoded = decodeAccessToken(accessToken);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in authCheck middleware: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default authCheck;
