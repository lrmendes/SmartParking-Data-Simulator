const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/smartparking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;