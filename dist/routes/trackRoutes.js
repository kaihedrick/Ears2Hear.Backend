"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 track Route | track table
 *
 * This will allow the routes from our respective controller and model ts files to be linked with the routes
 */
const express_1 = require("express");
//importing controller methods from trackController
const trackController_1 = require("../controllers/trackController");
const router = (0, express_1.Router)();
//route for getting all tracks in tracks table
router.get('/tracks', trackController_1.getAllTracks);
//route for getting track by specific id in tracks table
router.get('/tracks/:id', trackController_1.getTrackById);
//route for creating a track in tracks table
router.post('/tracks', trackController_1.createTrack);
//route for updating a track by id in tracks table
router.put('/tracks/:id', trackController_1.updateTrack);
//route for deleting a track by a specific id in tracks table
router.delete('/tracks/:id', trackController_1.deleteTrack);
exports.default = router;
