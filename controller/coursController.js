const Cours = require('../models/cours_modell');
const { catchAsync, AppError, handleDBErrors } = require('./error');

exports.addCours = handleDBErrors(catchAsync(async (req, res, next) => {
    const { id_cour, description_cour, date_update, duré, title_cour } = req.body;

    if (!id_cour || !description_cour || !date_update || !duré || !title_cour) {
        return next(new AppError('Missing fields', 400));
    }

    const cours = await Cours.addCours(id_cour, description_cour, date_update, duré, title_cour);
    
    res.status(201).json({
        status: 'success',
        data: {
            cours
        }
    });
}));

exports.getAllCours = handleDBErrors(catchAsync(async (req, res, next) => {
    const cours = await Cours.getAllCours();
    
    if (!cours || cours.length === 0) {
        return next(new AppError('No courses found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            cours
        }
    });
}));

exports.getCoursById = handleDBErrors(catchAsync(async (req, res, next) => {
    const { id_cour } = req.params;
    const cours = await Cours.getCoursById(id_cour);
    
    if (!cours) {
        return next(new AppError('No course found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            cours
        }
    });
}));

exports.updateCours = handleDBErrors(catchAsync(async (req, res, next) => {
    const { id_cour } = req.params;
    const { description_cour, date_update, duré, title_cour } = req.body;

    const cours = await Cours.updateCours(id_cour, description_cour, date_update, duré, title_cour);
    
    if (!cours) {
        return next(new AppError('No course found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            cours
        }
    });
}));

exports.deleteCours = handleDBErrors(catchAsync(async (req, res, next) => {
    const { id_cour } = req.params;
    const cours = await Cours.deleteCours(id_cour);
    
    if (!cours) {
        return next(new AppError('No course found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
}));