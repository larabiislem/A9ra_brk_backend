const PlaylistCour = require('../models/playlist_cour_model');
const { catchAsync, AppError, handleDBErrors } = require('./error');

exports.addPlaylistCour = handleDBErrors(catchAsync(async (req, res, next) => {
    const { id_playlist, id_cour } = req.body;

    if (!id_playlist || !id_cour) {
        return next(new AppError('Missing fields', 400));
    }

    const playlistCour = await PlaylistCour.addPlaylistCour(id_playlist, id_cour);
    
    res.status(201).json({
        status: 'success',
        data: {
            playlistCour
        }
    });
}));

exports.getAllPlaylistsCour = handleDBErrors(catchAsync(async (req, res, next) => {
    const playlistsCour = await PlaylistCour.getAllPlaylistsCour();
    
    if (!playlistsCour || playlistsCour.length === 0) {
        return next(new AppError('No playlist-course relations found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            playlistsCour
        }
    });
}));

exports.deletePlaylistCour = handleDBErrors(catchAsync(async (req, res, next) => {
    const { id_playlist } = req.params;
    const playlistCour = await PlaylistCour.deletePlaylistCour(id_playlist);
    
    if (!playlistCour) {
        return next(new AppError('No playlist-course relation found', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
}));