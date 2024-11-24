/**
 * Kai Hedrick
 * CST-321
 * Instructor Sparks
 * Ears 2 hear playlist_track Route | playlist_track table
 * 
 * This will allow the routes from our respective controller and model ts files to be linked with the routes
 */
import { Router } from 'express';
//importing controller methods from playlistTrackController
import { addTrackToPlaylist, removeTrackFromPlaylist} from '../controllers/playlistTrackController';

const router = Router();
//route for adding a track to specific playlist in playlists table
router.post('/playlists/:playlist_id/tracks/:track_id', addTrackToPlaylist);
//route for removing track from a specific playlist in playlists table
router.delete('/playlists/:playlist_id/tracks/:track_id', removeTrackFromPlaylist);

export default router;
