const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const Todo = require('../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: "First test todo"
}, {
    _id: new ObjectID(),
    text: "second test todo"
}];

//Removes all notes from collection before the test runs
beforeEach((done) => {
    Todo.remove({})
        .then(() => {
            Todo.insertMany(todos);
        }).then(() => {
            done();
        });
});

//TEST POST ROUTE
describe('POST To Dos', () => {
    it('should create a new to do', (done) => {
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text })
                    .then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    })
            })
    });
});

//TEST GET
describe('Get /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done)
    });
})


//Test suite for get todos by id
describe('Get /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        const hexId = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });


    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });
});


describe('DELETE /todos/:id', () => {

    //removes existing id and checks to make sure it doesn't exist
    it('should remove a todo', (done) => {
        const hexId = todos[0]._id.toHexString();
        console.log(hexId);

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(hexId);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

            Todo.findById(hexId)
                .then((todo) => {
                    expect(todo).toNotExist();
                    done();
                })
                .catch((error) => {
                    console.log(error);
                    done();
                });
            });
    });

    //id that doesn't exist in database
    it('return 404 if todo not found', (done) => {
        const hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    //invalid todo id
    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });
});