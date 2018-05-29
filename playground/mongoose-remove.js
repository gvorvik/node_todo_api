const {ObjectID} = require('mongodb');
const mongoose = require('./../server/db/mongoose.connect');
const Todo = require('./../server/models/ToDo.Schema');

let id = '5b06c01365e44904720b496211';

//removes all docs without returning them
Todo.remove({})
    .then((result) => {
        console.log(result);
    });


//removes one doc and returns the deleted doc
Todo.findOneAndRemove({_id: 'id'})
    .then((doc) => {
        console.log(doc);
    });

//Removes doc based on id and returns deleted doc
Todo.findByIdAndRemove('id')
    .then((todo) => {
        console.log(todo);
    });