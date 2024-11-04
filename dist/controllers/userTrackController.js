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
exports.removeUserTrack = exports.addUserTrack = void 0;
const userTrackModel_1 = require("../models/userTrackModel"); // Make sure to import correctly
/**
 * The addUserTrack function handles adding a track to a user's collection.
 * It retrieves the user_id and track_id from the request body, invokes the
 * addUserTrack method from the UserTrackModel, and returns a success message
 * or an error response if the operation fails.
 */
const addUserTrack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, track_id } = req.body;
    try {
        yield userTrackModel_1.UserTrackModel.addUserTrack(user_id, track_id);
        res.json({ message: 'Track added to user' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error adding track to user' });
    }
});
exports.addUserTrack = addUserTrack;
/**
 * The removeUserTrack function manages the removal of a track from a user's collection.
 * It retrieves the user_id and track_id from the request parameters, calls the
 * removeUserTrack method from the UserTrackModel, and sends a success message
 * or an error response if the operation fails.
 */
const removeUserTrack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, track_id } = req.params;
    try {
        yield userTrackModel_1.UserTrackModel.removeUserTrack(parseInt(user_id), parseInt(track_id));
        res.json({ message: 'Track removed from user' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error removing track from user' });
    }
});
exports.removeUserTrack = removeUserTrack;
