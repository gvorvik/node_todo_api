const {ObjectID} = require('mongodb');
const mongoose = require('./../server/db/mongoose.connect');
const Todo = require('./../server/models/ToDo.Schema');

let id = '5b06c01365e44904720b496211';

//takes value and returns true if valid and false if invalid
if(!ObjectID.isValid(id)) {
    console.log('id not valid!');
}

//Grabs all docs that match(in this case only one because ids are unique)
Todo.find({
    _id: id
}).then((todos) => {
    console.log(todos);
});


//Grabs one document at most
Todo.findOne({
    _id: id
}).then((todo) => {
    console.log(todo);
});

//Finds by ID
Todo.findById(id).
    then((todo) => {
        if(!todo) {
            return console.log('id not found!');
        }
        console.log(todo);
    })