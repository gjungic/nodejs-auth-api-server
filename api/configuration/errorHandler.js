module.exports = (app) => {
  app.use((req, res, next) => {
    const error = new Error('Unknown route');
    error.status = 404;
    next(error);
  });

  app.use((err, req, res, next) => {
    const { status, message } = err;
    res.status(status || 500).json({ message });
  });
};
