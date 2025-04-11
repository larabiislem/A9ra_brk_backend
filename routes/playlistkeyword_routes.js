const express = require('express');
const Router = express.Router();
const playlistKeyword = require('../controller/playlistkeywordcontroller');

Router.post('/playlist-keyword', playlistKeyword.addKeywordToPlaylist);
Router.get('/playlist-keyword/:id_playlist', playlistKeyword.getKeywordsForPlaylist);
Router.delete('/playlist-keyword', playlistKeyword.removeKeywordFromPlaylist);

module.exports = Router;