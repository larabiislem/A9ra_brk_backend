const express = require('express');
const Router = express.Router();
const user = require('../controller/user_controller');

Router.post('/user', user.createUser);
Router.post('/user/login', user.login);
Router.get('/user/:id_utilisateur', user.getProfile);
Router.patch('/user/:id_utilisateur', user.updateProfile);
Router.patch('/user/keywords/:id_utilisateur', user.updateKeywords);
Router.patch('/user/password/:id_utilisateur', user.changePassword);
Router.delete('/user/:id_utilisateur', user.deleteAccount);

module.exports = Router;