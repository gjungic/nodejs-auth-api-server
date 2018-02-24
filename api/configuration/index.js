module.exports = (app) => {
  // Connect to database
  require('./db');
  // Logger
  require('./logger')(app);
  // Body parser
  require('./requestBodyHandler')(app);
  // Add headers
  require('./headers')(app);
  // Routes
  require('./routeHandler')(app);
  // Error handling
  require('./errorHandler')(app);
};
