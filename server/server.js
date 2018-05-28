const mongoose = require('./db/mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');

require('./db/mongoose.connect');

const app = express();
const PORT = process.env.PORT || 3000;

const ToDo = require('./models/ToDo.Schema');
const User = require('./models/user');

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let text = req.body
    
    var todo = new ToDo(text);
    console.log(todo);
    
    todo.save(todo).then((response) => {
        res.send(response);
        console.log(response);
        
    }, (err) => {
        console.log(err);
    });
});

app.get('/todos', (req, res) => {
    ToDo.find()
    .then((todos) => {
        res.send({todos});
    })
    .catch((error) => {
        res.sendStatus(500);
        console.log(error);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)) {
        return res.sendStatus(404);
    }

    ToDo.findById(id)
    .then((todo) => {
        if(!todo) {
            return res.sendStatus(404);
        }
        res.send(todo);
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })


})

app.listen(PORT, () => {
    console.log(`app listening at ${PORT}`);
})


module.exports = {
    app
};

