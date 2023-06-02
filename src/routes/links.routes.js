const { Router } = require('express');
const LinksController = require('../controllers/links-controller.js');
const LinksRepository = require('../repositories/links-repository.js');
const router = Router();

const controller = new LinksController(new LinksRepository());

router.get('/', controller.getLinks);
// router.post('/', controller.createLinks);
// router.put('/:id', controller.updateLinks);

module.exports = router;

