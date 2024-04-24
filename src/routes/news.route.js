const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');

router.post('/detail', newsController.getNewsDetail);
router.post('/category', newsController.getNewsByCategory);
router.get('/', newsController.getNews);
module.exports = router;
