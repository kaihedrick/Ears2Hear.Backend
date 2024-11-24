"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear Index Page
 *
 * This file will import all the routes, establish a connection to the sql database in order to make
 */
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const promise_1 = __importDefault(require("mysql2/promise")); // Using mysql2/promise for async/await, instead of mysql2 standard
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const trackRoutes_1 = __importDefault(require("./routes/trackRoutes"));
const playlistRoutes_1 = __importDefault(require("./routes/playlistRoutes"));
const playlistTrackRoutes_1 = __importDefault(require("./routes/playlistTrackRoutes"));
const userTrackRoutes_1 = __importDefault(require("./routes/userTrackRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const protectedRoutes_1 = __importDefault(require("./routes/protectedRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)()); //cors allows the application to accept requests from different origins such as a front end application
app.use(body_parser_1.default.json()); //parses incoming json data (generally for postman)
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true })); //used for html forms to parse data from complex objects
// MySQL connection pool which connects to my ears2hear database
const db = promise_1.default.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'ears2hear',
});
// Basic route to an api test page, for testing the API directory
app.get('/api/test', (req, res) => {
    res.send('Hello from Express API!');
});
//basic display page for the main page of the localhost backend, verifying that the program is working functionally
app.get('/', (req, res) => {
    res.send('Welcome to backend for Ears2Hear!');
});
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/protected', protectedRoutes_1.default);
//here are all the different routes for our Controller, Model, and routes directories linking all functionalities for CRUD operations for database queries.
app.use('/api', userRoutes_1.default);
app.use('/api', trackRoutes_1.default);
app.use('/api', playlistRoutes_1.default);
app.use('/api', playlistTrackRoutes_1.default);
app.use('/api', userTrackRoutes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
