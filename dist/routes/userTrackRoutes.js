"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 User_Track Route | user_track table
 *
 * This will allow the routes from our respective controller and model ts files to be linked with the routes
 */
const express_1 = require("express");
//importing controller methods from userTrackController
const userTrackController_1 = require("../controllers/userTrackController");
const router = (0, express_1.Router)();
//route for adding a track to user id in user_tracks table
router.post('/users/:user_id/tracks/:track_id', userTrackController_1.addUserTrack);
//route for deleting a track from user id in user_tracks table
router.delete('/users/:user_id/tracks/:track_id', userTrackController_1.removeUserTrack);
exports.default = router;
