"use strict";
/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 user_tracks controller | user_tracks Table
 *
 * This controller facilitates the management of user_tracks data, allowing for the addition and removal of tracks associated with users.
 * It interacts with the UserTrackModel to execute database operations and returns structured responses to the client.
 */
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
exports.getLikedTracks = exports.removeLikedTrack = exports.addLikedTrack = void 0;
const userTrackModel_1 = require("../models/userTrackModel"); // Make sure to import correctly
/**
 * The addUserTrack function handles adding a track to a user's collection.
 * It retrieves the user_id and track_id from the request body, invokes the
 * addUserTrack method from the UserTrackModel, and returns a success message
 * or an error response if the operation fails.
 */
const addLikedTrack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, trackId } = req.body;
    try {
        yield userTrackModel_1.UserTrackModel.addLikedTrack(userId, trackId);
        res.json({ message: 'Track added to liked tracks successfully!' });
    }
    catch (error) {
        console.error('Error adding liked track:', error);
        res.status(500).json({ error: 'Failed to add liked track' });
    }
});
exports.addLikedTrack = addLikedTrack;
/**
 * Remove a track from the user's liked tracks
 */
const removeLikedTrack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield userTrackModel_1.UserTrackModel.removeLikedTrack(userId, trackId);
        res.status(200).json({ message: 'Track removed from liked tracks successfully!' });
    }
    catch (error) {
        console.error('Error removing liked track:', error);
        res.status(500).json({ error: 'Failed to remove liked track' });
    }
});
exports.removeLikedTrack = removeLikedTrack;
/**
 * Get all liked tracks for a user
 */
const getLikedTracks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    try {
        const likedTracks = yield userTrackModel_1.UserTrackModel.getLikedTracks(userId);
        res.json(likedTracks);
    }
    catch (error) {
        console.error('Error fetching liked tracks:', error);
        res.status(500).json({ error: 'Failed to fetch liked tracks' });
    }
});
exports.getLikedTracks = getLikedTracks;
