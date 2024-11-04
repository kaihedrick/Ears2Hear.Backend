/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 user controller | users Table
 * 
 * This controller facilitates the management of user data, enabling operations such as retrieving, creating, updating, and deleting users.
 * It interacts with the UserModel to perform database queries and returns structured responses to the client.
 */

import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';

/**
 * The getAllUsers function handles the retrieval of all users from the database.
 * It invokes the getAllUsers method from the UserModel, returning the list of users
 * in JSON format, or an error response if the operation fails.
 */
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error); // Log the error
        res.status(500).json({ error: 'Error fetching users' });
    }
};

/**
 * The getUserById function manages the retrieval of a specific user by their ID.
 * It extracts the user ID from the request parameters, calls the getUserById method 
 * from the UserModel, and returns the user data if found or a 404 error if not.
 */
export const getUserById = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    try {
        const user = await UserModel.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
};

/**
 * The createUser function handles the creation of a new user in the database.
 * It retrieves the user details from the request body, calls the createUser method 
 * from the UserModel, and returns the newly created user's ID, or an error response if the operation fails.
 */
export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const newUserId = await UserModel.createUser(name, email, password);
        res.status(201).json({ user_id: newUserId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

/**
 * The updateUser function manages the updating of an existing user in the database.
 * It retrieves the user ID from the request parameters and the updated details from the request body,
 * calls the updateUser method from the UserModel, and returns a success message or an error response if the operation fails.
 */
export const updateUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const { name, email, password } = req.body;
    try {
        await UserModel.updateUser(userId, name, email, password);
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
};

/**
 * The deleteUser function handles the removal of a user from the database.
 * It retrieves the user ID from the request parameters, calls the deleteUser method 
 * from the UserModel, and returns a success message or an error response if the operation fails.
 */
export const deleteUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    try {
        await UserModel.deleteUser(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};
