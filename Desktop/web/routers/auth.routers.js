const auth = require('../controllers/auth.controllers');

const router = require('express').Router();

router.post('/login', auth.login);

module.exports = router;