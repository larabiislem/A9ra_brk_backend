const express = require('express');
const Router = express.Router();
const abonement = require('../controller/abonnemnt_controler');

Router.post('/abonement', abonement.addAbonnement);
Router.delete('/abonement', abonement.deleteAbonnement);
Router.get('/abonement/abonnes/:id_utilisateur', abonement.getAbonnesByUser);
Router.get('/abonement/abonnements/:id_utilisateur', abonement.getAbonnementsByUser);
Router.get('/abonement/check/:id_abonne/:id_abonnement', abonement.checkAbonnement);

module.exports = Router;