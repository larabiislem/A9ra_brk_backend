const PlaylistKeyword = require('../models/playlistKeywordModel');
const { catchAsync, AppError, handleDBErrors } = require('./error');

exports.addKeywordToPlaylist = handleDBErrors(catchAsync(async (req, res, next) => {
    const { id_playlist, id_keyword } = req.body;

    if (!id_playlist || !id_keyword) {
        return next(new AppError('Missing fields', 400));
    }

    const playlistKeyword = await PlaylistKeyword.addKeywordToPlaylist(id_playlist, id_keyword);
    
    res.status(201).json({
        status: 'success',
        data: {
            playlistKeyword
        }
    });
}));

exports.getKeywordsForPlaylist = handleDBErrors(catchAsync(async (req, res, next) => {
    const { id_playlist } = req.params;
    const keywords = await PlaylistKeyword.getKeywordsForPlaylist(id_playlist);
    
    if (!keywords || keywords.length === 0) {
        return next(new AppError('No keywords found for this playlist', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            keywords
        }
    });
}));

exports.removeKeywordFromPlaylist = handleDBErrors(catchAsync(async (req, res, next) => {
    const { id_playlist, id_keyword } = req.body;
    const playlistKeyword = await PlaylistKeyword.removeKeywordFromPlaylist(id_playlist, id_keyword);
    
    if (!playlistKeyword) {
        return next(new AppError('No keyword found in this playlist', 404));
    }

    res.status(200).json({
        status: 'success',
        data: null
    });
}));