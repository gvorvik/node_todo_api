const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: String
    }
});


module.exports = mongoose.model('Todos', ToDoSchema);