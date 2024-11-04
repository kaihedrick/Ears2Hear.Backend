/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 playlist Route | playlist table
 * 
 * This will allow the routes from our respective controller and model ts files to be linked with the routes
 */
import { Router } from 'express';
//importing controller methods from playlistController
import { getAllPlaylists, getPlaylistById, createPlaylist, updatePlaylist, deletePlaylist } from '../controllers/playlistController';

const router = Router();
//route for getting all playlists
router.get('/playlists', getAllPlaylists);
//route for getting playlist by id
router.get('/playlists/:id', getPlaylistById);
//route for creating a playlist
router.post('/playlists', createPlaylist);
//route for updating a playlist by specified id
router.put('/playlists/:id', updatePlaylist);
//route for deleting playlist by specified id 
router.delete('/playlists/:id', deletePlaylist);

export default router;
