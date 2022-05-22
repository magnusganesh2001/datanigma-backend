const jwt = require('jsonwebtoken');
const config = require('dotenv');

config.config();

const JWT_KEY = process.env.JWT_KEY;

module.exports = (req,res,next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_KEY);
    req.userData = {email: decodedToken.email, id: decodedToken.id};
    next();
  } catch (error) {
    res.status(401).json({message: 'You are not authenticated!'});
  }
};
