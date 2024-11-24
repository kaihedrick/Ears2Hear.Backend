"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userTrackController_1 = require("../controllers/userTrackController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Add a liked track
router.post('/tracks/like', authMiddleware_1.verifyToken, userTrackController_1.addLikedTrack);
// Remove a liked track
router.delete('/tracks/unlike', authMiddleware_1.verifyToken, userTrackController_1.removeLikedTrack);
// Get all liked tracks for a specific user
router.get('/tracks/:userId/liked-tracks', authMiddleware_1.verifyToken, userTrackController_1.getLikedTracks);
exports.default = router;
