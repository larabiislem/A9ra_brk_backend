const express = require('express');
const Router = express.Router();
const keyword = require('../controller/keywordController');

Router.post('/keyword', keyword.addKeyword);
Router.get('/keyword', keyword.getAllKeywords);
Router.get('/keyword/:id_keyword', keyword.getKeywordById);
Router.delete('/keyword/:id_keyword', keyword.deleteKeyword);

module.exports = Router;