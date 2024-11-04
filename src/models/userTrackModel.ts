/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 user_tracks model | user_tracks Table
 * 
 * This will allow the model to retrieve user_tracks data from the database, perform data validation, and returned structured data to the user_track controller
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
 * defines the structured way to represent the relationship between users and tracks
 * serves as a contract for the data that the model and the controller will work with
 */
export interface UserTrack {
    user_id: number;
    track_id: number;
}

/**
 * This object UserTrackModel encapsulates two methods, addUserTrack, and removeUserTrack. 
 * These methods will query the data directly from the database, ensuring the design represents a format that the controller can use
 */
export const UserTrackModel = {
    // * The addUserTrack will add a track to the Users tracks, representing liked songs
    addUserTrack: async (user_id: number, track_id: number): Promise<void> => {
        await db.query('INSERT INTO user_tracks (user_id, track_id) VALUES (?, ?)', [user_id, track_id]);
    },
    // * The removeUserTrack will remove a track from the Users tracks
    removeUserTrack: async (user_id: number, track_id: number): Promise<void> => {
        await db.query('DELETE FROM user_tracks WHERE user_id = ? AND track_id = ?', [user_id, track_id]);
    },
};
