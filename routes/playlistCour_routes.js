const express = require('express');
const Router = express.Router();
const playlistCour = require('../controller/playlistCourController');

Router.post('/playlist-cour', playlistCour.addPlaylistCour);
Router.get('/playlist-cour', playlistCour.getAllPlaylistsCour);
Router.delete('/playlist-cour/:id_playlist', playlistCour.deletePlaylistCour);

module.exports = Router;