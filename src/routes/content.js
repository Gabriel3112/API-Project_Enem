const express = require('express');
const controller = require('../controller/content');

const router = express.Router();

router.get('/content', controller.SearchContent);

router.get('/user', controller.ShowUserContent);

router.post('/content', controller.InsertContent);



module.exports = router;