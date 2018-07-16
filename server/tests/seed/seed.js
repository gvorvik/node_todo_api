const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const Todo = require('./../../models/ToDo.Schema');

const User = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'greg@example.com',
    password: 'user1pass',
    tokens: [{
        access: 'auth', 
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'saltstring').toString(),
    }]
}, {
    _id: userTwoId,
    email: 'gus@example.com',
    password: 'user2pass'
}];

const todos = [{
    _id: new ObjectID(),
    text: "First test todo"
}, {
    _id: new ObjectID(),
    text: "second test todo",
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) => {
    Todo.remove({})
        .then(() => {
            Todo.insertMany(todos);
        }).then(() => {
            done();
        });
};

const populateUsers = (done) => {
    User.remove({})
    .then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        //waits to fire until all users are saved
        return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
}

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers,
}