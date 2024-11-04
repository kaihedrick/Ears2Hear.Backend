/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 playlist model | playlists Table
 * 
 * This will allow the model to retrieve playlists data from the database, perform data validation, and returned structured data to the playlist controller
 */

//importing RowDataPacket will return a single row of data returned from a query
//importing resultSetHeader will return metadata about result form query | used for returning number of affected rows in query
import mysql, { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

// MySQL connection pool which connects to my ears2hear database
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ears2hear',
});
/*
 * defines the structured way to represent the structure of the Playlist Model
 * serves as a contract for the data that the model and the controller will work with
 */
export interface Playlist {
    playlist_id: number;
    name: string;
    user_id: number;
    created_at: Date;
}
/**
 * This object PlaylistModel encapsulates five methods, getAllPlaylists, getPlaylistById, createPlaylist, updatePlaylist, and deletePlaylist
 * These methods will query the data directly from the database, ensuring the design represents a format that the controller can use
 */
export const PlaylistModel = {
    // getAllPlaylists retrieves all playlists from the playlists table in the database and maps each row to a track object format.
    getAllPlaylists: async (): Promise<Playlist[]> => {
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM playlists');
        return rows.map(row => ({
            playlist_id: row.playlist_id,
            name: row.name,
            user_id: row.user_id,
            created_at: row.created_at,
        }));
    },
    // getPlaylistById retrieves 1 playlist from the playlists table in the database and maps each row to a track object format.
    getPlaylistById: async (playlistId: number): Promise<Playlist | null> => {
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM playlists WHERE playlist_id = ?', [playlistId]);
        return rows.length > 0 ? rows[0] as Playlist : null; 
    },
    // createPlaylist creates a playlist for the playlists table in the database to be inserted as a query
    createPlaylist: async (name: string, user_id: number): Promise<number> => {
        const [result] = await db.query<ResultSetHeader>('INSERT INTO playlists (name, user_id, created_at) VALUES (?, ?, NOW())', [name, user_id]);
        return result.insertId; 
    },
    // updatePlaylist retrieves 1 playlist by Id from the playlists table in the database and updates the playlist by query
    updatePlaylist: async (playlistId: number, name: string): Promise<void> => {
        await db.query('UPDATE playlists SET name = ? WHERE playlist_id = ?', [name, playlistId]);
    },
    // deletePlaylist retrieves 1 playlist by Id from the playlists table in the database and removes playlist from database
    deletePlaylist: async (playlistId: number): Promise<void> => {
        await db.query('DELETE FROM playlists WHERE playlist_id = ?', [playlistId]);
    },
};
