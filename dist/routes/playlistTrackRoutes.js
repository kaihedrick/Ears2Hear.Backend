"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 playlist_track Route | playlist_track table
 *
 * This will allow the routes from our respective controller and model ts files to be linked with the routes
 */
const express_1 = require("express");
//importing controller methods from playlistTrackController
const playlistTrackController_1 = require("../controllers/playlistTrackController");
const router = (0, express_1.Router)();
//route for adding a track to specific playlist in playlists table
router.post('/playlists/:playlist_id/tracks/:track_id', playlistTrackController_1.addTrackToPlaylist);
//route for removing track from a specific playlist in playlists table
router.delete('/playlists/:playlist_id/tracks/:track_id', playlistTrackController_1.removeTrackFromPlaylist);
exports.default = router;
