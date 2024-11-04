"use strict";
/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 playlistTrack model | playlist_tracks Table
 *
 * This will allow the model to retrieve playlist_tracks data from the database, perform data validation, and returned structured data to the playlist_track controller
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
exports.PlaylistTrackModel = void 0;
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
 * This object PlaylistTrackModel encapsulates two methods, addTrackToPlaylist, and removeTrackFromPlaylist.
 * These methods will query the data directly from the database, ensuring the design represents a format that the controller can use
 */
exports.PlaylistTrackModel = {
    // The addTrackToPlaylist will add a track to the playlist_tracks table, adding the track to the playlist
    addTrackToPlaylist: (playlist_id, track_id) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.query('INSERT INTO playlist_tracks (playlist_id, track_id, added_at) VALUES (?, ?, NOW())', [playlist_id, track_id]);
    }),
    // The removeTrackFromPlaylist will remove a track from the playlist tracks
    removeTrackFromPlaylist: (playlist_id, track_id) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.query('DELETE FROM playlist_tracks WHERE playlist_id = ? AND track_id = ?', [playlist_id, track_id]);
    }),
};
