/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 track Route | track table
 * 
 * This will allow the routes from our respective controller and model ts files to be linked with the routes
 */
import { Router } from 'express';
//importing controller methods from trackController
import {
    getAllTracks,
    getTrackById,
    createTrack,
    updateTrack,
    deleteTrack
} from '../controllers/trackController';

const router = Router();
//route for getting all tracks in tracks table
router.get('/tracks', getAllTracks);
//route for getting track by specific id in tracks table
router.get('/tracks/:id', getTrackById);
//route for creating a track in tracks table
router.post('/tracks', createTrack);
//route for updating a track by id in tracks table
router.put('/tracks/:id', updateTrack);
//route for deleting a track by a specific id in tracks table
router.delete('/tracks/:id', deleteTrack);

export default router;
