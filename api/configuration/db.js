const mongoose = require('mongoose');
const { mongoURI } = require('./keys');

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(error => console.log(JSON.stringify(
    {
      message: 'An error occurred while connecting to MongoDB',
      error
    }, null, 2)
    )
  )
