import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default isAuthenticated;
