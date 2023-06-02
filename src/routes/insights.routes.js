const { Router } = require('express');
const InsightsController = require('../controllers/insights-controller.js');
const InsightsRepository = require('../repositories/insights-repository.js');
const router = Router();

const controller = new InsightsController(new InsightsRepository());

router.get('/', controller.getInsights);
// router.post('/', controller.createInsights);
// router.put('/:id', controller.updateInsights);

module.exports = router;

