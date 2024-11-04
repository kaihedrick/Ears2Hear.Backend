/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 user model | users Table
 * 
 * This will allow the model to retrieve users data from the database, perform data validation, and returned structured data to the user controller
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
 * defines the structured way to represent the structure of the User Model
 * serves as a contract for the data that the model and the controller will work with
 */
export interface User {
    user_id: number;
    name: string;
    email: string;
    password: string;
}

/**
 * This object UserModel encapsulates five methods, getAllUsers, getUserById, createUser, updateUser, and deleteUser
 * These methods will query the data directly from the database, ensuring the design represents a format that the controller can use
 */
export const UserModel = {
    // getAllUsers retrieves all users from the users table in the database and maps each row to a User object format.
    getAllUsers: async (): Promise<User[]> => {
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users');
        return rows.map(row => ({
            user_id: row.user_id,
            name: row.name,
            email: row.email,
            password: row.password, // Potentially format differently in future for security
        }));
    },
    //getUserById retrieves a user by id from the users table in the database and maps each row to the User object format.
    getUserById: async (userId: number): Promise<User | null> => {
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE user_id = ?', [userId]);
        if (rows.length > 0) {
            const row = rows[0];
            return {
                user_id: row.user_id,
                name: row.name,
                email: row.email,
                password: row.password, // Potentially format differently in future for security
            };
        }
        return null; // Return null if not found
    },
    //createUser retrieves will create a user for the users table in the database
    createUser: async (name: string, email: string, password: string): Promise<number> => {
        const [result] = await db.query<mysql.ResultSetHeader>('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        return result.insertId; // may be changed in future | correctly implemented 
    },
    //updateUser retrieves a user by id from the users table in the database to update a specific table column
    updateUser: async (userId: number, name: string, email: string, password: string): Promise<void> => {
        await db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE user_id = ?', [name, email, password, userId]);
    },
    //deleteUser retrieves a user by id from the users table in the database to be deleted
    deleteUser: async (userId: number): Promise<void> => {
        await db.query('DELETE FROM users WHERE user_id = ?', [userId]);
    },
};
