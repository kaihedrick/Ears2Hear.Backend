"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 playlist Route | playlist table
 *
 * This will allow the routes from our respective controller and model ts files to be linked with the routes
 */
const express_1 = require("express");
//importing controller methods from playlistController
const playlistController_1 = require("../controllers/playlistController");
const router = (0, express_1.Router)();
//route for getting all playlists
router.get('/playlists', playlistController_1.getAllPlaylists);
//route for getting playlist by id
router.get('/playlists/:id', playlistController_1.getPlaylistById);
//route for creating a playlist
router.post('/playlists', playlistController_1.createPlaylist);
//route for updating a playlist by specified id
router.put('/playlists/:id', playlistController_1.updatePlaylist);
//route for deleting playlist by specified id 
router.delete('/playlists/:id', playlistController_1.deletePlaylist);
exports.default = router;
