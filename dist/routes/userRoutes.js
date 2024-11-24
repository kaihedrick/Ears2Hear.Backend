"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 User Route | user table
 *
 * This will allow the routes from our respective controller and model ts files to be linked with the routes
 */
const express_1 = require("express");
//importing controller methods from userController
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
//route for getting all users in users table
router.get('/users', userController_1.getAllUsers);
//route for getting user by id in users table
router.get('/users/:id', userController_1.getUserById);
//method for creating a user in users table
router.post('/users', userController_1.createUser);
//method for updating a user by id in users table
router.put('/users/:id', userController_1.updateUser);
//method for deleting a user by id in users table
router.delete('/users/:id', userController_1.deleteUser);
// Route for user login
router.post('/login', userController_1.loginUser); // Add this route
exports.default = router;
