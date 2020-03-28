const express = require('express');
const router = express.Router();

const target = require('../controllers/target-pages.controller');

router.get('/list-target',target.getTargetPages);
router.post('/insert-target',target.InsertTargetPages);
router.delete('/delete-target',target.deleteTargetPages);

module.exports = router;