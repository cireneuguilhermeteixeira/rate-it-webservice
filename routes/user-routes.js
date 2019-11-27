const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get(`/`,userController.findAll);
router.get(`/:id`,userController.findById);
router.put(`/`,userController.update);
router.delete(`/:id`,userController.delete);
router.post(`/currentUser`,userController.currentUser);

module.exports = router;
