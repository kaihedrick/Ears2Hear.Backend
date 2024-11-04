/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 track controller | tracks Table
 * 
 * This controller facilitates the management of track data, enabling operations such as retrieving, creating, updating, and deleting tracks.
 * It interacts with the TrackModel to perform database queries and returns structured responses to the client.
 */
import { Request, Response } from 'express';
import { TrackModel } from '../models/trackModel';

/**
 * This method will retrieve all tracks inside the ears2hear application database. These tracks will be formatted as JSON 
 * containing table columns for track_ID (INT), title (string), artist (string), genre (string), duration (time).
 * 
 * @param req - The request object containing information about the HTTP request.
 *             It does not need any specific parameters for this method.
 * @param res - The response object used to send the JSON response back to the client.
 *             It will send either the list of tracks or an error message.
 */
export const getAllTracks = async (req: Request, res: Response) => {
    try {
        const tracks = await TrackModel.getAllTracks();
        res.json(tracks);
    } catch (error) {
        console.error('Error fetching tracks:', error);
        res.status(500).json({ error: 'Error fetching tracks' });
    }
};

/**
 * This method will retrieve a track by ID from the ears2hear application database. This track will be formatted as JSON 
 * containing table columns for track_ID (INT), title (string), artist (string), genre (string), duration (time).
 * 
 * @param req - The request object containing the track ID in the URL parameters.
 *             Expected to have the format: { params: { id: string } }
 * @param res - The response object used to send the JSON response back to the client.
 *             It will send the track data or a 404 error if not found.
 */
export const getTrackById = async (req: Request, res: Response) => {
    const trackId = parseInt(req.params.id);
    try {
        const track = await TrackModel.getTrackById(trackId);
        if (track) {
            res.json(track);
        } else {
            res.status(404).json({ error: 'Track not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching track' });
    }
};

/**
 * This method will create a track in the ears2hear application database. This track will be formatted as JSON 
 * containing table columns for track_ID (INT), title (string), artist (string), genre (string), duration (time).
 * 
 * @param req - The request object containing the new track details in the body.
 *             Expected to have the format: { body: { title: string, artist: string, genre: string, duration: string } }
 * @param res - The response object used to send the JSON response back to the client.
 *             It will send the new track ID or an error message if the creation fails.
 */
export const createTrack = async (req: Request, res: Response) => {
    const { title, artist, genre, duration } = req.body;
    try {
        const newTrackId = await TrackModel.createTrack(title, artist, genre, duration);
        res.status(201).json({ track_id: newTrackId });
    } catch (error) {
        console.error('Error creating track:', error); // Log the actual error
        res.status(500).json({ error: 'Error creating track' });
    }
};


/**
 * This method will update a track based on the given parameters using the track ID.
 * After finding the ID, this will allow the editing of a track with any of the parameters:
 * title (string), artist (string), genre (string), duration (time).
 * 
 * @param req - The request object containing the track ID in the URL parameters and updated track details in the body.
 *             Expected to have the format: { params: { id: string }, body: { title: string, artist: string, genre: string, duration: string } }
 * @param res - The response object used to send the JSON response back to the client.
 *             It will send a success message or an error message if the update fails.
 */
export const updateTrack = async (req: Request, res: Response) => {
    const trackId = parseInt(req.params.id);
    const { title, artist, genre, duration } = req.body;
    try {
        await TrackModel.updateTrack(trackId, title, artist, genre, duration);
        res.json({ message: 'Track updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating track' });
    }
};

/**
 * This method will delete a track from the ears2hear application database using the track ID.
 * 
 * @param req - The request object containing the track ID in the URL parameters.
 *             Expected to have the format: { params: { id: string } }
 * @param res - The response object used to send the JSON response back to the client.
 *             It will send a success message or an error message if the deletion fails.
 */
export const deleteTrack = async (req: Request, res: Response) => {
    const trackId = parseInt(req.params.id);
    try {
        await TrackModel.deleteTrack(trackId);
        res.json({ message: 'Track deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting track' });
    }
};
