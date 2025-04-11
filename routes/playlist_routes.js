const express = require('express');
const router = express.Router();
const playlistController = require('../controller/playlist_controller');


// Routes Playlist
router.post('/', playlistController.addPlaylist);
router.get('/', playlistController.getAllPlaylists);
router.get('/:id_playlist', playlistController.getPlaylistById);
router.delete('/:id_playlist', playlistController.deletePlaylist);
router.post('/:id_playlist/keywords', playlistController.ajoutMotCleDansPlaylist);

// Nouvelle route pour ajouter un cours à une playlist
router.post('/:id_user/cours', playlistController.addCoursToPlaylist);

module.exports = router;