const express = require('express');
const Router = express.Router();
const cours = require('../controller/coursController');

Router.post('/cours', cours.addCours);
Router.get('/cours', cours.getAllCours);
Router.get('/cours/:id_cour', cours.getCoursById);
Router.patch('/cours/:id_cour', cours.updateCours);
Router.delete('/cours/:id_cour', cours.deleteCours);
Router.get('/playlist/:id_playlist', cours.getCoursInPlaylist);
Router.get('/:id_cour/in-playlist/:id_playlist', cours.isCoursInPlaylist);

module.exports = Router;