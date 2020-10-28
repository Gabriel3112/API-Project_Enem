const express = require('express');
const controller = require('../controller/content');

const router = express.Router();


router.get('/content', controller.SearchContent);

router.post('/content', controller.InsertContent);



router.get('/user', controller.ShowUserContent);

router.delete('/user', controller.DeleteContent);




module.exports = router;