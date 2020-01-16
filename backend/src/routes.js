const { Router } = require('express');

const DevController = require('../src/controllers/DevController');
const SearchController = require('../src/controllers/SearchController');

const routes = Router();

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);
routes.put('/devs', DevController.update);
routes.delete('/devs/:github_username', DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;