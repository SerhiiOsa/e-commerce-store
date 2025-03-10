const adminCheck = async (req, res, next) => {
  try {
    const isAdmin = req.user.role === 'admin';

    if (!isAdmin) {
      return res.status(403).json({ message: 'Access denied - Admin only' });
    }

    next();
  } catch (error) {
    console.error('Error in adminCheck middleware: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default adminCheck;
