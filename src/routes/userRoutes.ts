/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 Hear User Route | user table
 * 
 * This will allow the routes from our respective controller and model ts files to be linked with the routes
 */
import { Router } from 'express';
//importing controller methods from userController
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser // Import the loginUser function
} from '../controllers/userController';

const router = Router();
//route for getting all users in users table
router.get('/users', getAllUsers);
//route for getting user by id in users table
router.get('/users/:id', getUserById);
//method for creating a user in users table
router.post('/users', createUser);
//method for updating a user by id in users table
router.put('/users/:id', updateUser);
//method for deleting a user by id in users table
router.delete('/users/:id', deleteUser);
// Route for user login
router.post('/login', loginUser); // Add this route

export default router;
