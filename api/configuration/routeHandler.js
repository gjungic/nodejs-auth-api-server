const userRoutes  = require('../routes/auth');
const routeHelper = require('../helpers/routeHelper');

module.exports = (app) => {
  app.use('/', routeHelper, userRoutes);
};
