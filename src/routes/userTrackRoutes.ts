/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear User Track Routes
 * 
 * This file defines the API routes for managing user track interactions in the Ears 2 Hear application. 
 * These routes allow users to like tracks, unlike tracks, and view their liked tracks. 
 * All routes are secured with JWT authentication to ensure only authorized users can perform these actions.
 */

import { Router } from 'express';
import {
  addLikedTrack,
  removeLikedTrack,
  getLikedTracks,
} from '../controllers/userTrackController';
import { verifyToken } from '../middleware/authMiddleware';

// Initialize the router for user track-related endpoints
const router = Router();

/**
 * POST /tracks/like
 * 
 * Route to add a track to the user's liked tracks.
 * This route is protected by the `verifyToken` middleware to ensure the user is authenticated.
 */
router.post('/tracks/like', verifyToken, addLikedTrack);

/**
 * POST /tracks/unlike
 * 
 * Route to remove a track from the user's liked tracks.
 * This route is protected by the `verifyToken` middleware to ensure the user is authenticated.
 */
router.post('/tracks/unlike', verifyToken, removeLikedTrack);

/**
 * GET /tracks/:userId/liked-tracks
 * 
 * Route to retrieve all liked tracks for a specific user.
 * The `userId` parameter identifies the user, and the `verifyToken` middleware ensures authentication.
 */
router.get('/tracks/:userId/liked-tracks', verifyToken, getLikedTracks);

// Export the router for integration with the main application
export default router;
