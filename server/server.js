const mongoose = require('./db/mongoose');
const express = require('express');
const bodyParser = require('body-parser');

require('./models/mongoose.connect');

const app = express();
const PORT = process.env.PORT || 3000;

const ToDo = require('./models/todo');
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

app.listen(PORT, () => {
    console.log(`app listening at ${PORT}`);
})


module.exports = {
    app
};

