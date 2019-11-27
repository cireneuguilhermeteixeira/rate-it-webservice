const express = require('express');
const router = express.Router();
const authUserController = require('../controllers/authUser');

router.post(`/`,authUserController.save);
router.post(`/login`,authUserController.authentication);
router.post(`/forgotPassword`,authUserController.forgotPassword);

module.exports = router;
