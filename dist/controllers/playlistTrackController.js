"use strict";
/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 playlistTrack controller | playlist_tracks Table
 *
 * This controller facilitates the management of playlist track data, enabling operations such as adding and removing tracks from playlists.
 * It interacts with the PlaylistTrackModel to perform database queries and returns structured responses to the client.
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
exports.removeTrackFromPlaylist = exports.addTrackToPlaylist = void 0;
const playlistTrackModel_1 = require("../models/playlistTrackModel");
/**
 * This method adds a track to a playlist in the ears2hear application database.
 * It retrieves the playlist ID and track ID from the request body and calls the model method to perform the insertion.
 *
 * @param req - The request object containing the playlist ID and track ID in the body.
 * @param res - The response object used to send the JSON response.
 */
const addTrackToPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playlist_id, track_id } = req.body;
    try {
        yield playlistTrackModel_1.PlaylistTrackModel.addTrackToPlaylist(playlist_id, track_id);
        res.json({ message: 'Track added to playlist' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error adding track to playlist' });
    }
});
exports.addTrackToPlaylist = addTrackToPlaylist;
/**
 * This method removes a track from a playlist in the ears2hear application database.
 * It retrieves the playlist ID and track ID from the request parameters and calls the model method to perform the deletion.
 *
 * @param req - The request object containing the playlist ID and track ID as parameters.
 * @param res - The response object used to send the JSON response.
 */
const removeTrackFromPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playlist_id, track_id } = req.params;
    try {
        yield playlistTrackModel_1.PlaylistTrackModel.removeTrackFromPlaylist(parseInt(playlist_id), parseInt(track_id));
        res.json({ message: 'Track removed from playlist' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error removing track from playlist' });
    }
});
exports.removeTrackFromPlaylist = removeTrackFromPlaylist;
