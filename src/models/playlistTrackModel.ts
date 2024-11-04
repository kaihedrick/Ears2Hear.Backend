/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 playlistTrack model | playlist_tracks Table
 * 
 * This will allow the model to retrieve playlist_tracks data from the database, perform data validation, and returned structured data to the playlist_track controller
 */

//importing RowDataPacket will return a single row of data returned from a query
import mysql, { RowDataPacket } from 'mysql2/promise';

// MySQL connection pool which connects to my ears2hear database
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ears2hear',
});
/*
 * defines the structured way to represent the relationship between playlists and tracks
 * serves as a contract for the data that the model and the controller will work with
 */
export interface PlaylistTrack {
    playlist_id: number;
    track_id: number;
    added_at: Date;
}
/**
 * This object PlaylistTrackModel encapsulates two methods, addTrackToPlaylist, and removeTrackFromPlaylist. 
 * These methods will query the data directly from the database, ensuring the design represents a format that the controller can use
 */
export const PlaylistTrackModel = {
    // The addTrackToPlaylist will add a track to the playlist_tracks table, adding the track to the playlist
    addTrackToPlaylist: async (playlist_id: number, track_id: number): Promise<void> => {
        await db.query('INSERT INTO playlist_tracks (playlist_id, track_id, added_at) VALUES (?, ?, NOW())', [playlist_id, track_id]);
    },
    // The removeTrackFromPlaylist will remove a track from the playlist tracks
    removeTrackFromPlaylist: async (playlist_id: number, track_id: number): Promise<void> => {
        await db.query('DELETE FROM playlist_tracks WHERE playlist_id = ? AND track_id = ?', [playlist_id, track_id]);
    },
};
