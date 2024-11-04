"use strict";
/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 playlist controller | playlists Table
 *
 * This controller facilitates the management of playlist data, enabling operations such as retrieving, creating, updating, and deleting playlists.
 * It interacts with the PlaylistModel to perform database queries and returns structured responses to the client.
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
exports.deletePlaylist = exports.updatePlaylist = exports.createPlaylist = exports.getPlaylistById = exports.getAllPlaylists = void 0;
const playlistModel_1 = require("../models/playlistModel");
/**
 * This method retrieves all playlists from the ears2hear application database.
 * It calls the model method to fetch the playlists and returns them as a JSON response.
 *
 * @param req - The request object.
 * @param res - The response object used to send the JSON response.
 */
const getAllPlaylists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playlists = yield playlistModel_1.PlaylistModel.getAllPlaylists();
        res.json(playlists);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching playlists' });
    }
});
exports.getAllPlaylists = getAllPlaylists;
/**
 * This method retrieves a playlist by its ID from the ears2hear application database.
 * It calls the model method to fetch the playlist and returns it as a JSON response.
 *
 * @param req - The request object containing the playlist ID as a parameter.
 * @param res - The response object used to send the JSON response.
 */
const getPlaylistById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playlistId = parseInt(req.params.id);
    try {
        const playlist = yield playlistModel_1.PlaylistModel.getPlaylistById(playlistId);
        res.json(playlist);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching playlist' });
    }
});
exports.getPlaylistById = getPlaylistById;
/**
 * This method creates a new playlist in the ears2hear application database.
 * It retrieves the playlist name and user ID from the request body and calls the model method to perform the insertion.
 *
 * @param req - The request object containing the playlist name and user ID in the body.
 * @param res - The response object used to send the JSON response.
 */
const createPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, user_id } = req.body;
    try {
        const newPlaylistId = yield playlistModel_1.PlaylistModel.createPlaylist(name, user_id);
        res.status(201).json({ playlist_id: newPlaylistId });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating playlist' });
    }
});
exports.createPlaylist = createPlaylist;
/**
 * This method updates an existing playlist in the ears2hear application database.
 * It retrieves the playlist ID from the request parameters and the new name from the request body,
 * then calls the model method to perform the update.
 *
 * @param req - The request object containing the playlist ID as a parameter and the new name in the body.
 * @param res - The response object used to send the JSON response.
 */
const updatePlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playlistId = parseInt(req.params.id);
    const { name } = req.body;
    try {
        yield playlistModel_1.PlaylistModel.updatePlaylist(playlistId, name);
        res.json({ message: 'Playlist updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating playlist' });
    }
});
exports.updatePlaylist = updatePlaylist;
/**
 * This method deletes a playlist from the ears2hear application database.
 * It retrieves the playlist ID from the request parameters and calls the model method to perform the deletion.
 *
 * @param req - The request object containing the playlist ID as a parameter.
 * @param res - The response object used to send the JSON response.
 */
const deletePlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playlistId = parseInt(req.params.id);
    try {
        yield playlistModel_1.PlaylistModel.deletePlaylist(playlistId);
        res.json({ message: 'Playlist deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting playlist' });
    }
});
exports.deletePlaylist = deletePlaylist;
