"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtConfig_1 = require("../config/jwtConfig");
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.error('No token provided in Authorization header');
        res.status(401).json({ message: 'No token, authorization denied' }); // No explicit return
        return; // Stop further execution
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtConfig_1.jwtConfig.jwtSecret);
        console.log('Decoded token:', decoded); // Log the decoded token to verify
        req.user = decoded; // Attach decoded user data to the request
        next(); // Proceed to the next middleware
    }
    catch (err) {
        console.error('Token verification failed:', err);
        res.status(401).json({ message: 'Token is not valid' }); // No explicit return
    }
};
exports.verifyToken = verifyToken;
