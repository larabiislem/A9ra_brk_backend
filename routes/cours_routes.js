const express = require('express');
const Router = express.Router();
const cours = require('../controllers/coursController');

Router.post('/cours', cours.addCours);
Router.get('/cours', cours.getAllCours);
Router.get('/cours/:id_cour', cours.getCoursById);
Router.patch('/cours/:id_cour', cours.updateCours);
Router.delete('/cours/:id_cour', cours.deleteCours);

module.exports = Router;