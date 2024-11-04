/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 User_Track Route | user_track table
 * 
 * This will allow the routes from our respective controller and model ts files to be linked with the routes
 */
import { Router } from "express";
//importing controller methods from userTrackController
import { addUserTrack, removeUserTrack} from '../controllers/userTrackController';

const router = Router();
//route for adding a track to user id in user_tracks table
router.post('/users/:user_id/tracks/:track_id', addUserTrack);
//route for deleting a track from user id in user_tracks table
router.delete('/users/:user_id/tracks/:track_id', removeUserTrack);

export default router;
