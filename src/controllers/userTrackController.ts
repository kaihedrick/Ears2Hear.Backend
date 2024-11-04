/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 user_tracks controller | user_tracks Table
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
export const addUserTrack = async (req: Request, res: Response) => {
    const { user_id, track_id } = req.body;
    try {
        await UserTrackModel.addUserTrack(user_id, track_id);
        res.json({ message: 'Track added to user' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding track to user' });
    }
};

/**
 * The removeUserTrack function manages the removal of a track from a user's collection.
 * It retrieves the user_id and track_id from the request parameters, calls the 
 * removeUserTrack method from the UserTrackModel, and sends a success message 
 * or an error response if the operation fails.
 */
export const removeUserTrack = async (req: Request, res: Response) => {
    const { user_id, track_id } = req.params;
    try {
        await UserTrackModel.removeUserTrack(parseInt(user_id), parseInt(track_id));
        res.json({ message: 'Track removed from user' });
    } catch (error) {
        res.status(500).json({ error: 'Error removing track from user' });
    }
};
