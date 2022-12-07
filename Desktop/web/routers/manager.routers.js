const manager = require('../controllers/manager.controllers');

const router = require('express').Router();

router.get('/list_user', manager.getAllUser);
router.get('/list_product', manager.getListProduct);

module.exports = router;