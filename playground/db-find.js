const { MongoClient, ObjectID } = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/todoapi', (err, db) => {
    if (err) {
        return console.log('unable to connect to mongodb server', err);
    }

    console.log('connected to mongodb server');

    //queries the database and returns a promise
    db.collection('Users')
        .find({ location: 'New Brighton'})
        .toArray()
        .then((docs) => {
            console.log(docs);
        }, (err) => {
            console.log(err);
        });

    //count adds the number of documents in a collection
    db.collection('Users')
    .count()
    .then((count) => {
        console.log(count);
    }, (err) => {
        console.log(err);
    });

    // db.close();
});