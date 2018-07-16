require('./config/config');
require('./db/mongoose.connect');


const mongoose = require('./db/mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const app = express();
const PORT = process.env.PORT;
const ToDo = require('./models/ToDo.Schema');
const User = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let text = req.body
    
    var todo = new ToDo(text);
    
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

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.sendStatus(404);
    }
    
    ToDo.findByIdAndRemove(id)
        .then((todo) => {
            if(!todo) {
                return res.sendStatus(404);
            }

            res.send(todo);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
})

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    //takes an object(1st param) and picks off keys if they exist(2nd param)
    const body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.sendStatus(404);
    }
    //check if body.completed is a boolean and if it's true
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    ToDo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((todo) => {
        if(!todo) {
            return res.sendStatus(404);
        }
        res.send({todo});
    })
    .catch((error) => {
        res.sendStatus(400);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password)
    .then((user) => {
        return user.generateAuthToken()
        .then((token) => {
            res.header('x-auth', token).send(user);
        })
    })
    .catch((err) => {
        res.sendStatus(400);
    });
})

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    user.save()
    .then(() => {
        return user.generateAuthToken();
    })
    .then((token) => {
        res.header('x-auth', token).send(user);
    })
    .catch(err => res.sendStatus(400));

});

app.listen(PORT, () => {
    console.log(`app listening at ${PORT}`);
})


module.exports = {
    app
};

