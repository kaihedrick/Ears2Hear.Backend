/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 playlist controller | playlists Table
 * 
 * This controller facilitates the management of playlist data, enabling operations such as retrieving, creating, updating, and deleting playlists.
 * It interacts with the PlaylistModel to perform database queries and returns structured responses to the client.
 */

import { Request, Response } from 'express';
import { PlaylistModel } from '../models/playlistModel';

/**
 * This method retrieves all playlists from the ears2hear application database.
 * It calls the model method to fetch the playlists and returns them as a JSON response.
 * 
 * @param req - The request object.
 * @param res - The response object used to send the JSON response.
 */
export const getAllPlaylists = async (req: Request, res: Response) => {
    try {
        const playlists = await PlaylistModel.getAllPlaylists();
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching playlists' });
    }
};

/**
 * This method retrieves a playlist by its ID from the ears2hear application database.
 * It calls the model method to fetch the playlist and returns it as a JSON response.
 * 
 * @param req - The request object containing the playlist ID as a parameter.
 * @param res - The response object used to send the JSON response.
 */
export const getPlaylistById = async (req: Request, res: Response) => {
    const playlistId = parseInt(req.params.id);
    try {
        const playlist = await PlaylistModel.getPlaylistById(playlistId);
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching playlist' });
    }
};

/**
 * This method creates a new playlist in the ears2hear application database.
 * It retrieves the playlist name and user ID from the request body and calls the model method to perform the insertion.
 * 
 * @param req - The request object containing the playlist name and user ID in the body.
 * @param res - The response object used to send the JSON response.
 */
export const createPlaylist = async (req: Request, res: Response) => {
    const { name, user_id } = req.body;
    try {
        const newPlaylistId = await PlaylistModel.createPlaylist(name, user_id);
        res.status(201).json({ playlist_id: newPlaylistId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating playlist' });
    }
};

/**
 * This method updates an existing playlist in the ears2hear application database.
 * It retrieves the playlist ID from the request parameters and the new name from the request body,
 * then calls the model method to perform the update.
 * 
 * @param req - The request object containing the playlist ID as a parameter and the new name in the body.
 * @param res - The response object used to send the JSON response.
 */
export const updatePlaylist = async (req: Request, res: Response) => {
    const playlistId = parseInt(req.params.id);
    const { name } = req.body;
    try {
        await PlaylistModel.updatePlaylist(playlistId, name);
        res.json({ message: 'Playlist updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating playlist' });
    }
};

/**
 * This method deletes a playlist from the ears2hear application database.
 * It retrieves the playlist ID from the request parameters and calls the model method to perform the deletion.
 * 
 * @param req - The request object containing the playlist ID as a parameter.
 * @param res - The response object used to send the JSON response.
 */
export const deletePlaylist = async (req: Request, res: Response) => {
    const playlistId = parseInt(req.params.id);
    try {
        await PlaylistModel.deletePlaylist(playlistId);
        res.json({ message: 'Playlist deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting playlist' });
    }
};
