const Abonement = require('../models/abonement_model');
const { catchAsync, AppError, handleDBErrors } = require('./error');

exports.addAbonnement = handleDBErrors(catchAsync(async (req, res, next) => {
    const { id_abonne, id_abonnement } = req.body;

    if (!id_abonne || !id_abonnement) {
        return next(new AppError('Missing fields', 400));
    }

    const abonnement = await Abonement.addAbonnement(id_abonne, id_abonnement);
    
    res.status(201).json({
        status: 'success',
        data: {
            abonnement
        }
    });
}));

exports.deleteAbonnement = handleDBErrors(catchAsync(async (req, res, next) => {
    const { id_abonne, id_abonnement } = req.body;

    const abonnement = await Abonement.deleteAbonnement(id_abonne, id_abonnement);
    
    if (!abonnement) {
        return next(new AppError('No subscription found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: null
    });
}));

exports.getAbonnesByUser = handleDBErrors(catchAsync(async (req, res, next) => {
    const { id_utilisateur } = req.params;
    const abonnes = await Abonement.getAbonnesByUser(id_utilisateur);
    
    if (!abonnes || abonnes.length === 0) {
        return next(new AppError('No followers found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            abonnes
        }
    });
}));

exports.getAbonnementsByUser = handleDBErrors(catchAsync(async (req, res, next) => {
    const { id_utilisateur } = req.params;
    const abonnements = await Abonement.getAbonnementsByUser(id_utilisateur);
    
    if (!abonnements || abonnements.length === 0) {
        return next(new AppError('No subscriptions found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            abonnements
        }
    });
}));

exports.checkAbonnement = handleDBErrors(catchAsync(async (req, res, next) => {
    const { id_abonne, id_abonnement } = req.params;
    const abonnement = await Abonement.checkAbonnement(id_abonne, id_abonnement);
    
    res.status(200).json({
        status: 'success',
        data: {
            isFollowing: !!abonnement
        }
    });
}));