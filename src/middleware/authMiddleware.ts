/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 hear JWT Middleware
 * 
 * This middleware verifies the JSON Web Token (JWT) provided in the Authorization header of incoming requests.
 * If the token is valid, it decodes the payload and attaches it to the request object for further use in the application.
 * If the token is missing or invalid, an appropriate error response is sent, denying access to the requested resource.
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwtConfig';
import { JwtPayload } from '../types/auth';

// Extend the Express Request object to include user data from the JWT
interface CustomRequest extends Request {
  user?: JwtPayload;
}

/**
 * Middleware function to verify the JWT in the Authorization header.
 */
export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.header('Authorization'); // Retrieve the Authorization header
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the header

  if (!token) {
    // Handle missing token scenario
    console.error('No token provided in Authorization header');
    res.status(401).json({ message: 'No token, authorization denied' });
    return; // Stop further execution
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, jwtConfig.jwtSecret) as JwtPayload;
    console.log('Decoded token:', decoded); // Log the decoded token for debugging
    req.user = decoded; // Attach the decoded payload to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // Handle invalid token scenario
    console.error('Token verification failed:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
