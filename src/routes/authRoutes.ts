/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear Authentication Routes
 * 
 * This file defines the authentication routes for the Ears 2 Hear application, 
 * providing login functionality with input validation, secure password verification, 
 * and JWT generation. It interacts with the user model to validate credentials and 
 * create a session token.
 */

import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import { jwtConfig } from '../config/jwtConfig';
import { UserModel } from '../models/userModel'; // Adjust based on your ORM setup

// Initialize the router for authentication routes
const router = Router();

/**
 * POST /login
 * 
 * This route handles user login. It performs the following:
 * - Validates the presence of username and password in the request body.
 * - Checks the username and password against the database.
 * - Generates a JWT token for successful authentication.
 */
router.post(
  '/login',
  [
    // Validate input fields
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req: Request, res: Response): Promise<void> => {
    // Validate incoming request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return; // Stop execution if validation fails
    }

    const { username, password } = req.body;

    try {
      // Retrieve user by username
      const user = await UserModel.findOne({ where: { name: username } }); // Adjust for ORM
      if (!user) {
        res.status(401).json({ message: 'Invalid username or password' }); // Invalid credentials
        return; // Stop execution
      }

      // Compare provided password with stored hash
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: 'Invalid username or password' }); // Invalid credentials
        return; // Stop execution
      }

      // Generate a JWT token with user details
      const token = jwt.sign(
        { id: user.user_id, username: user.name },
        jwtConfig.jwtSecret,
        { expiresIn: jwtConfig.jwtExpiresIn } // Token expiration time
      );

      // Respond with the generated token and success message
      res.json({ token, message: 'Login successful' });
    } catch (err) {
      // Log and handle server errors
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Export the authentication router
export default router;
