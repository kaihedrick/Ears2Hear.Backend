/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear Index Page
 * 
 * This file will import all the routes, establish a connection to the sql database in order to make 
 */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2/promise'; // Using mysql2/promise for async/await, instead of mysql2 standard
import userRoutes from './routes/userRoutes';
import trackRoutes from './routes/trackRoutes';
import playlistRoutes from './routes/playlistRoutes';
import playlistTrackRoutes from './routes/playlistTrackRoutes';
import userTrackRoutes from './routes/userTrackRoutes';
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); //cors allows the application to accept requests from different origins such as a front end application
app.use(bodyParser.json()); //parses incoming json data (generally for postman)
app.use(bodyParser.urlencoded({ extended: true })); //used for html forms to parse data from complex objects

// MySQL connection pool which connects to my ears2hear database
const db = mysql.createPool({
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

//here are all the different routes for our Controller, Model, and routes directories linking all functionalities for CRUD operations for database queries.
app.use('/api', userRoutes);  
app.use('/api', trackRoutes);
app.use('/api', playlistRoutes);  
app.use('/api', playlistTrackRoutes);  
app.use('/api', userTrackRoutes);  
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
