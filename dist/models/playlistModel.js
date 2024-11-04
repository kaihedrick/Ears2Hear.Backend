"use strict";
/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 playlist model | playlists Table
 *
 * This will allow the model to retrieve playlists data from the database, perform data validation, and returned structured data to the playlist controller
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
exports.PlaylistModel = void 0;
//importing RowDataPacket will return a single row of data returned from a query
//importing resultSetHeader will return metadata about result form query | used for returning number of affected rows in query
const promise_1 = __importDefault(require("mysql2/promise"));
// MySQL connection pool which connects to my ears2hear database
const db = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ears2hear',
});
/**
 * This object PlaylistModel encapsulates five methods, getAllPlaylists, getPlaylistById, createPlaylist, updatePlaylist, and deletePlaylist
 * These methods will query the data directly from the database, ensuring the design represents a format that the controller can use
 */
exports.PlaylistModel = {
    // getAllPlaylists retrieves all playlists from the playlists table in the database and maps each row to a track object format.
    getAllPlaylists: () => __awaiter(void 0, void 0, void 0, function* () {
        const [rows] = yield db.query('SELECT * FROM playlists');
        return rows.map(row => ({
            playlist_id: row.playlist_id,
            name: row.name,
            user_id: row.user_id,
            created_at: row.created_at,
        }));
    }),
    // getPlaylistById retrieves 1 playlist from the playlists table in the database and maps each row to a track object format.
    getPlaylistById: (playlistId) => __awaiter(void 0, void 0, void 0, function* () {
        const [rows] = yield db.query('SELECT * FROM playlists WHERE playlist_id = ?', [playlistId]);
        return rows.length > 0 ? rows[0] : null;
    }),
    // createPlaylist creates a playlist for the playlists table in the database to be inserted as a query
    createPlaylist: (name, user_id) => __awaiter(void 0, void 0, void 0, function* () {
        const [result] = yield db.query('INSERT INTO playlists (name, user_id, created_at) VALUES (?, ?, NOW())', [name, user_id]);
        return result.insertId;
    }),
    // updatePlaylist retrieves 1 playlist by Id from the playlists table in the database and updates the playlist by query
    updatePlaylist: (playlistId, name) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.query('UPDATE playlists SET name = ? WHERE playlist_id = ?', [name, playlistId]);
    }),
    // deletePlaylist retrieves 1 playlist by Id from the playlists table in the database and removes playlist from database
    deletePlaylist: (playlistId) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.query('DELETE FROM playlists WHERE playlist_id = ?', [playlistId]);
    }),
};
