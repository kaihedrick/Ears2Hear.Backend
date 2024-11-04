"use strict";
/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 track model | tracks Table
 *
 * This will allow the model to retrieve tracks data from the database, perform data validation, and returned structured data to the track controller
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
exports.TrackModel = void 0;
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
 * This object TrackModel encapsulates five methods, getAllTracks, getTrackById, createTrack, updateTrack, and deleteTrack
 * These methods will query the data directly from the database, ensuring the design represents a format that the controller can use
 */
exports.TrackModel = {
    // getAllTracks retrieves all tracks from the tracks table in the database and maps each row to a track object format.
    getAllTracks: () => __awaiter(void 0, void 0, void 0, function* () {
        const [rows] = yield db.query('SELECT * FROM tracks');
        return rows.map(row => ({
            track_id: row.track_id,
            title: row.title,
            artist: row.artist,
            genre: row.genre,
            duration: row.duration,
        }));
    }),
    // getTrackById retrieves 1 track from the tracks table in the database and maps each row to a track object format.
    getTrackById: (trackId) => __awaiter(void 0, void 0, void 0, function* () {
        const [rows] = yield db.query('SELECT * FROM tracks WHERE track_id = ?', [trackId]);
        if (rows.length > 0) {
            const row = rows[0];
            return {
                track_id: row.track_id,
                title: row.title,
                artist: row.artist,
                genre: row.genre,
                duration: row.duration,
            };
        }
        return null;
    }),
    // createTrack creates a track for the tracks table in the database to be inserted as a query
    createTrack: (title, artist, genre, duration) => __awaiter(void 0, void 0, void 0, function* () {
        const [result] = yield db.query('INSERT INTO tracks (title, artist, genre, duration) VALUES (?, ?, ?, ?)', [title, artist, genre, duration]);
        return result.insertId;
    }),
    // updateTrack retrieves 1 track by Id from the tracks table in the database and updates the track by query
    updateTrack: (trackId, title, artist, genre, duration) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.query('UPDATE tracks SET title = ?, artist = ?, genre = ?, duration = ? WHERE track_id = ?', [title, artist, genre, duration, trackId]);
    }),
    // deleteTrack retrieves 1 track by Id from the tracks table in the database and removes track from database
    deleteTrack: (trackId) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.query('DELETE FROM tracks WHERE track_id = ?', [trackId]);
    }),
};
