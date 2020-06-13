const JWT = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token

    const dotenv = require('dotenv');
    dotenv.config({ path: './config.env' }); // here will pass an object to env so it will understand where the configuration file is located
    const JwtSecret = process.env.JWT_SECRET || 'mySecrettoken';

    try {
        const decoded = JWT.verify(token, JwtSecret);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}