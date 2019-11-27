const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluation');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.post(`/`,evaluationController.newEvaluation);
router.get(`/`,evaluationController.findAll);
router.get(`/:id`,evaluationController.findById);
router.delete(`/:id`,evaluationController.delete);

module.exports = router;
