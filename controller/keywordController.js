const Keyword = require('../models/keywordModel');
const { catchAsync, AppError, handleDBErrors } = require('./error');

exports.addKeyword = handleDBErrors(catchAsync(async (req, res, next) => {
    const { id_keyword, keyword_name } = req.body;

    if (!id_keyword || !keyword_name) {
        return next(new AppError('Missing fields', 400));
    }

    const keyword = await Keyword.addKeyword(id_keyword, keyword_name);
    
    res.status(201).json({
        status: 'success',
        data: {
            keyword
        }
    });
}));

exports.getAllKeywords = handleDBErrors(catchAsync(async (req, res, next) => {
    const keywords = await Keyword.getAllKeywords();
    
    if (!keywords || keywords.length === 0) {
        return next(new AppError('No keywords found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            keywords
        }
    });
}));

exports.getKeywordById = handleDBErrors(catchAsync(async (req, res, next) => {
    const { id_keyword } = req.params;
    const keyword = await Keyword.getKeywordById(id_keyword);
    
    if (!keyword) {
        return next(new AppError('No keyword found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            keyword
        }
    });
}));

exports.deleteKeyword = handleDBErrors(catchAsync(async (req, res, next) => {
    const { id_keyword } = req.params;
    const keyword = await Keyword.deleteKeyword(id_keyword);
    
    if (!keyword) {
        return next(new AppError('No keyword found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
}));