const mongoose = require('mongoose');
// const ToDo = require('./models/ToDo.Schema');;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/todoapi');

module.exports = mongoose;