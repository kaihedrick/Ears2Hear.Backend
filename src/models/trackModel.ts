/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 track model | tracks Table
 * 
 * This will allow the model to retrieve tracks data from the database, perform data validation, and returned structured data to the track controller
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
 * defines the structured way to represent the structure of the Track Model
 * serves as a contract for the data that the model and the controller will work with
 */
export interface Track {
    track_id: number;
    title: string;
    artist: string;
    genre: string;
    duration: string; // Store duration as string to match MySQL TIME format
}

/**
 * This object TrackModel encapsulates five methods, getAllTracks, getTrackById, createTrack, updateTrack, and deleteTrack
 * These methods will query the data directly from the database, ensuring the design represents a format that the controller can use
 */
export const TrackModel = {
    // getAllTracks retrieves all tracks from the tracks table in the database and maps each row to a track object format.
    getAllTracks: async (): Promise<Track[]> => {
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM tracks');
        return rows.map(row => ({
            track_id: row.track_id,
            title: row.title,
            artist: row.artist,
            genre: row.genre,
            duration: row.duration,
        }));
    },
    // getTrackById retrieves 1 track from the tracks table in the database and maps each row to a track object format.
    getTrackById: async (trackId: number): Promise<Track | null> => {
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM tracks WHERE track_id = ?', [trackId]);
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
    },
    // createTrack creates a track for the tracks table in the database to be inserted as a query
    createTrack: async (title: string, artist: string, genre: string, duration: string): Promise<number> => {
        const [result] = await db.query<mysql.ResultSetHeader>(
            'INSERT INTO tracks (title, artist, genre, duration) VALUES (?, ?, ?, ?)',
            [title, artist, genre, duration]
        );
        return result.insertId;
    },
    // updateTrack retrieves 1 track by Id from the tracks table in the database and updates the track by query
    updateTrack: async (trackId: number, title: string, artist: string, genre: string, duration: string): Promise<void> => {
        await db.query('UPDATE tracks SET title = ?, artist = ?, genre = ?, duration = ? WHERE track_id = ?', [title, artist, genre, duration, trackId]);
    },
    // deleteTrack retrieves 1 track by Id from the tracks table in the database and removes track from database
    deleteTrack: async (trackId: number): Promise<void> => {
        await db.query('DELETE FROM tracks WHERE track_id = ?', [trackId]);
    },
};
