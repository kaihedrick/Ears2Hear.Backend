"use strict";
/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 user controller | users Table
 *
 * This controller facilitates the management of user data, enabling operations such as retrieving, creating, updating, and deleting users.
 * It interacts with the UserModel to perform database queries and returns structured responses to the client.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const userModel_1 = require("../models/userModel");
/**
 * The getAllUsers function handles the retrieval of all users from the database.
 * It invokes the getAllUsers method from the UserModel, returning the list of users
 * in JSON format, or an error response if the operation fails.
 */
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.UserModel.getAllUsers();
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error); // Log the error
        res.status(500).json({ error: 'Error fetching users' });
    }
});
exports.getAllUsers = getAllUsers;
/**
 * The getUserById function manages the retrieval of a specific user by their ID.
 * It extracts the user ID from the request parameters, calls the getUserById method
 * from the UserModel, and returns the user data if found or a 404 error if not.
 */
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    try {
        const user = yield userModel_1.UserModel.getUserById(userId);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
});
exports.getUserById = getUserById;
/**
 * The createUser function handles the creation of a new user in the database.
 * It retrieves the user details from the request body, calls the createUser method
 * from the UserModel, and returns the newly created user's ID, or an error response if the operation fails.
 */
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const newUserId = yield userModel_1.UserModel.createUser(name, email, password);
        res.status(201).json({ user_id: newUserId });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});
exports.createUser = createUser;
/**
 * The updateUser function manages the updating of an existing user in the database.
 * It retrieves the user ID from the request parameters and the updated details from the request body,
 * calls the updateUser method from the UserModel, and returns a success message or an error response if the operation fails.
 */
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    const { name, email, password } = req.body;
    try {
        yield userModel_1.UserModel.updateUser(userId, name, email, password);
        res.json({ message: 'User updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
});
exports.updateUser = updateUser;
/**
 * The deleteUser function handles the removal of a user from the database.
 * It retrieves the user ID from the request parameters, calls the deleteUser method
 * from the UserModel, and returns a success message or an error response if the operation fails.
 */
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    try {
        yield userModel_1.UserModel.deleteUser(userId);
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
});
exports.deleteUser = deleteUser;
