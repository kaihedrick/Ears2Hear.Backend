"use strict";
/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 user model | users Table
 *
 * This will allow the model to retrieve users data from the database, perform data validation, and returned structured data to the user controller
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
exports.UserModel = void 0;
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
 * This object UserModel encapsulates five methods, getAllUsers, getUserById, createUser, updateUser, and deleteUser
 * These methods will query the data directly from the database, ensuring the design represents a format that the controller can use
 */
exports.UserModel = {
    // getAllUsers retrieves all users from the users table in the database and maps each row to a User object format.
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [rows] = yield db.query('SELECT * FROM users');
            console.log('Users fetched:', rows);
            return rows.map(row => ({
                user_id: row.user_id,
                name: row.name,
                email: row.email,
                password: row.password,
            }));
        }
        catch (error) {
            console.error('Error in getAllUsers query:', error);
            throw error;
        }
    }),
    findOne(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield db.query('SELECT * FROM users WHERE name = ?', [condition.where.name]);
            if (rows.length > 0) {
                const row = rows[0];
                return {
                    user_id: row.user_id,
                    name: row.name,
                    email: row.email,
                    password: row.password,
                };
            }
            return null; // Return null if no user is found
        });
    },
    //getUserById retrieves a user by id from the users table in the database and maps each row to the User object format.
    getUserById: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const [rows] = yield db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
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
    }),
    validateUser: (username, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [rows] = yield db.query('SELECT * FROM users WHERE name = ? AND password = ?', [username, password]);
            if (rows.length > 0) {
                const row = rows[0];
                return {
                    user_id: row.user_id,
                    name: row.name,
                    email: row.email,
                    password: row.password, // Potentially hash or omit this in the future for security
                };
            }
            return null; // Return null if no user is found
        }
        catch (error) {
            console.error('Error validating user:', error);
            throw error; // Re-throw the error to be handled by the controller
        }
    }),
    //createUser retrieves will create a user for the users table in the database
    createUser: (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const [result] = yield db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        return result.insertId; // may be changed in future | correctly implemented 
    }),
    //updateUser retrieves a user by id from the users table in the database to update a specific table column
    updateUser: (userId, name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE user_id = ?', [name, email, password, userId]);
    }),
    //deleteUser retrieves a user by id from the users table in the database to be deleted
    deleteUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.query('DELETE FROM users WHERE user_id = ?', [userId]);
    }),
};
