"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrack = exports.updateTrack = exports.createTrack = exports.getTrackById = exports.getAllTracks = void 0;
const trackModel_1 = require("../models/trackModel");
/**
 * This method will retrieve all tracks inside the ears2hear application database. These tracks will be formatted as JSON
 * containing table columns for track_ID (INT), title (string), artist (string), genre (string), duration (time).
 *
 * @param req - The request object containing information about the HTTP request.
 *             It does not need any specific parameters for this method.
 * @param res - The response object used to send the JSON response back to the client.
 *             It will send either the list of tracks or an error message.
 */
const getAllTracks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tracks = yield trackModel_1.TrackModel.getAllTracks();
        res.json(tracks);
    }
    catch (error) {
        console.error('Error fetching tracks:', error);
        res.status(500).json({ error: 'Error fetching tracks' });
    }
});
exports.getAllTracks = getAllTracks;
/**
 * This method will retrieve a track by ID from the ears2hear application database. This track will be formatted as JSON
 * containing table columns for track_ID (INT), title (string), artist (string), genre (string), duration (time).
 *
 * @param req - The request object containing the track ID in the URL parameters.
 *             Expected to have the format: { params: { id: string } }
 * @param res - The response object used to send the JSON response back to the client.
 *             It will send the track data or a 404 error if not found.
 */
const getTrackById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trackId = parseInt(req.params.id);
    try {
        const track = yield trackModel_1.TrackModel.getTrackById(trackId);
        if (track) {
            res.json(track);
        }
        else {
            res.status(404).json({ error: 'Track not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching track' });
    }
});
exports.getTrackById = getTrackById;
/**
 * This method will create a track in the ears2hear application database. This track will be formatted as JSON
 * containing table columns for track_ID (INT), title (string), artist (string), genre (string), duration (time).
 *
 * @param req - The request object containing the new track details in the body.
 *             Expected to have the format: { body: { title: string, artist: string, genre: string, duration: string } }
 * @param res - The response object used to send the JSON response back to the client.
 *             It will send the new track ID or an error message if the creation fails.
 */
const createTrack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, artist, genre, duration } = req.body;
    try {
        const newTrackId = yield trackModel_1.TrackModel.createTrack(title, artist, genre, duration);
        res.status(201).json({ track_id: newTrackId });
    }
    catch (error) {
        console.error('Error creating track:', error); // Log the actual error
        res.status(500).json({ error: 'Error creating track' });
    }
});
exports.createTrack = createTrack;
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
const updateTrack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trackId = parseInt(req.params.id);
    const { title, artist, genre, duration } = req.body;
    try {
        yield trackModel_1.TrackModel.updateTrack(trackId, title, artist, genre, duration);
        res.json({ message: 'Track updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating track' });
    }
});
exports.updateTrack = updateTrack;
/**
 * This method will delete a track from the ears2hear application database using the track ID.
 *
 * @param req - The request object containing the track ID in the URL parameters.
 *             Expected to have the format: { params: { id: string } }
 * @param res - The response object used to send the JSON response back to the client.
 *             It will send a success message or an error message if the deletion fails.
 */
const deleteTrack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trackId = parseInt(req.params.id);
    try {
        yield trackModel_1.TrackModel.deleteTrack(trackId);
        res.json({ message: 'Track deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting track' });
    }
});
exports.deleteTrack = deleteTrack;
