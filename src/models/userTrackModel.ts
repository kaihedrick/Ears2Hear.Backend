/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 hear hear user_tracks model | user_tracks Table
 * 
 * This model facilitates the management of the `user_tracks` table in the database. 
 * It provides methods to add, remove, and retrieve tracks associated with users.
 * These methods perform data validation and ensure that database operations are structured and reusable.
 */

// Importing required modules and types from the MySQL library
import mysql, { RowDataPacket } from 'mysql2/promise';

// Create a MySQL connection pool to interact with the `ears2hear` database
const db = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'root', 
    database: 'ears2hear', 
});

/**
 * Defines the structure of the `UserTrack` interface, representing the relationship between users and tracks.
 * This interface serves as a contract for the data used by the model and controller.
 */
export interface UserTrack {
    user_id: number; // The ID of the user
    track_id: number; // The ID of the track
}

/**
 * The `UserTrackModel` object encapsulates methods for interacting with the `user_tracks` table.
 * It includes methods to add a liked track, remove a liked track, and retrieve all liked tracks for a user.
 */
export const UserTrackModel = {
  /**
   * Adds a track to the user's liked tracks in the database.
   * 
   * @param userId - The ID of the user who liked the track.
   * @param trackId - The ID of the track to be added.
   * @throws If the query fails, an error will be thrown.
   */
  addLikedTrack: async (userId: number, trackId: number): Promise<void> => {
    await db.query('INSERT INTO user_tracks (user_id, track_id) VALUES (?, ?)', [userId, trackId]);
  },

  /**
   * Removes a track from the user's liked tracks in the database.
   * 
   * @param userId - The ID of the user who unliked the track.
   * @param trackId - The ID of the track to be removed.
   * @throws If no rows are affected, an error is thrown indicating that the track does not exist for the user.
   */
  removeLikedTrack: async (userId: number, trackId: number): Promise<void> => {
    const query = `
      DELETE FROM user_tracks
      WHERE user_id = ? AND track_id = ?
    `;
  
    console.log('Executing query:', query, [userId, trackId]);
  
    try {
      // Execute the query and explicitly type the result
      const [result] = await db.query<mysql.ResultSetHeader>(query, [userId, trackId]);
      console.log('Delete result:', result); // Log the query result for debugging
  
      if (result.affectedRows === 0) {
        throw new Error('No rows affected. The track may not exist for this user.');
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error; // Rethrow the error to be handled by the controller
    }
  },
  
  /**
   * Retrieves all liked tracks for a specific user from the database.
   * 
   * @param userId - The ID of the user whose liked tracks are being retrieved.
   * @returns An array of liked tracks, including details like title, artist, genre, and duration.
   * @throws If the query fails, an error will be thrown.
   */
  getLikedTracks: async (userId: number): Promise<any[]> => {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT tracks.* FROM tracks
       JOIN user_tracks ON tracks.track_id = user_tracks.track_id
       WHERE user_tracks.user_id = ?`,
      [userId]
    );
    return rows;
  },
};
