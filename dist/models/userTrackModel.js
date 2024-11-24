"use strict";
/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 user_tracks model | user_tracks Table
 *
 * This will allow the model to retrieve user_tracks data from the database, perform data validation, and returned structured data to the user_track controller
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTrackModel = void 0;
//importing RowDataPacket will return a single row of data returned from a query
const promise_1 = __importDefault(require("mysql2/promise"));
// MySQL connection pool which connects to my ears2hear database
const db = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ears2hear',
});
/**
 * This object UserTrackModel encapsulates two methods, addUserTrack, and removeUserTrack.
 * These methods will query the data directly from the database, ensuring the design represents a format that the controller can use
 */
exports.UserTrackModel = {
    // Add a track to the user's liked tracks
    addLikedTrack: (userId, trackId) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.query('INSERT INTO user_tracks (user_id, track_id) VALUES (?, ?)', [userId, trackId]);
    }),
    // Remove a track from the user's liked tracks
    removeLikedTrack: (userId, trackId) => __awaiter(void 0, void 0, void 0, function* () {
        const query = `
      DELETE FROM user_tracks
      WHERE user_id = ? AND track_id = ?
    `;
        console.log('Executing query:', query, [userId, trackId]);
        try {
            // Explicitly type the result as ResultSetHeader
            const [result] = yield db.query(query, [userId, trackId]);
            console.log('Delete result:', result); // Log query result
            if (result.affectedRows === 0) {
                throw new Error('No rows affected. The track may not exist for this user.');
            }
        }
        catch (error) {
            console.error('Error executing query:', error);
            throw error; // Rethrow error to be caught by the controller
        }
    }),
    // Retrieve all liked tracks for a specific user
    getLikedTracks: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const [rows] = yield db.query(`SELECT tracks.* FROM tracks
       JOIN user_tracks ON tracks.track_id = user_tracks.track_id
       WHERE user_tracks.user_id = ?`, [userId]);
        return rows;
    }),
};
