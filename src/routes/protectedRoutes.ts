/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear Profile Route
 * 
 * This file defines a route for the user profile functionality in the Ears 2 Hear application. 
 * It utilizes JWT authentication to secure the profile endpoint, ensuring only authorized 
 * users can access their profile data.
 */

import { Router, Request, Response } from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { JwtPayload } from '../types/auth';

// Extend the Express Request object to include user data from the verified token
interface CustomRequest extends Request {
  user?: JwtPayload;
}

// Initialize the router for profile-related routes
const router = Router();

/**
 * GET /profile
 * 
 * This route retrieves the user's profile information after verifying their JWT token.
 * If the user is unauthorized or their token is invalid, they will receive a 401 error.
 */
router.get('/profile', verifyToken, (req: CustomRequest, res: Response) => {
  // Check if the user is available after token verification
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' }); // Respond with an unauthorized error
    return; // Stop further execution
  }

  // Respond with a welcome message and the user's data
  res.json({ message: 'Welcome to your profile', user: req.user });
});

// Export the router to be used in the main application
export default router;
