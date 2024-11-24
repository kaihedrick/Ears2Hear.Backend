/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 hear playlistTrack controller | playlist_tracks Table
 * 
 * This controller facilitates the management of playlist track data, enabling operations such as adding and removing tracks from playlists.
 * It interacts with the PlaylistTrackModel to perform database queries and returns structured responses to the client.
 */

import { Request, Response } from 'express';
import { PlaylistTrackModel } from '../models/playlistTrackModel';

/**
 * This method adds a track to a playlist in the ears2hear application database.
 * It retrieves the playlist ID and track ID from the request body and calls the model method to perform the insertion.
 * 
 * @param req - The request object containing the playlist ID and track ID in the body.
 * @param res - The response object used to send the JSON response.
 */
export const addTrackToPlaylist = async (req: Request, res: Response) => {
    const { playlist_id, track_id } = req.body;
    try {
        await PlaylistTrackModel.addTrackToPlaylist(playlist_id, track_id);
        res.json({ message: 'Track added to playlist' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding track to playlist' });
    }
};

/**
 * This method removes a track from a playlist in the ears2hear application database.
 * It retrieves the playlist ID and track ID from the request parameters and calls the model method to perform the deletion.
 * 
 * @param req - The request object containing the playlist ID and track ID as parameters.
 * @param res - The response object used to send the JSON response.
 */
export const removeTrackFromPlaylist = async (req: Request, res: Response) => {
    const { playlist_id, track_id } = req.params;
    try {
        await PlaylistTrackModel.removeTrackFromPlaylist(parseInt(playlist_id), parseInt(track_id));
        res.json({ message: 'Track removed from playlist' });
    } catch (error) {
        res.status(500).json({ error: 'Error removing track from playlist' });
    }
};
