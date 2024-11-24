/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 hear user_tracks controller | user_tracks Table
 * 
 * This controller facilitates the management of user_tracks data, allowing for the addition and removal of tracks associated with users.
 * It interacts with the UserTrackModel to execute database operations and returns structured responses to the client.
 */

import { Request, Response } from 'express';
import { UserTrackModel } from '../models/userTrackModel'; // Make sure to import correctly

/**
 * The addUserTrack function handles adding a track to a user's collection.
 * It retrieves the user_id and track_id from the request body, invokes the 
 * addUserTrack method from the UserTrackModel, and returns a success message 
 * or an error response if the operation fails.
 */
export const addLikedTrack = async (req: Request, res: Response) => {
    const { userId, trackId } = req.body;
  
    try {
      await UserTrackModel.addLikedTrack(userId, trackId);
      res.json({ message: 'Track added to liked tracks successfully!' });
    } catch (error) {
      console.error('Error adding liked track:', error);
      res.status(500).json({ error: 'Failed to add liked track' });
    }
  };

/**
 * Remove a track from the user's liked tracks
 */
export const removeLikedTrack = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, trackId } = req.body;
  
      // Validate input
      if (!userId || !trackId) {
        res.status(400).json({ error: 'User ID and Track ID are required' });
        return; // Explicitly return to end execution
      }
      console.log('Received payload:', req.body);

      // Log the request payload for debugging
      console.log('Removing liked track:', { userId, trackId });
  
      // Call the model to remove the track
      await UserTrackModel.removeLikedTrack(userId, trackId);
  
      res.status(200).json({ message: 'Track removed from liked tracks successfully!' });
    } catch (error) {
      console.error('Error removing liked track:', error);
      res.status(500).json({ error: 'Failed to remove liked track' });
    }
  };
  
  
  /**
   * Get all liked tracks for a user
   */
  export const getLikedTracks = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
  
    try {
      const likedTracks = await UserTrackModel.getLikedTracks(userId);
      res.json(likedTracks);
    } catch (error) {
      console.error('Error fetching liked tracks:', error);
      res.status(500).json({ error: 'Failed to fetch liked tracks' });
    }
  };
