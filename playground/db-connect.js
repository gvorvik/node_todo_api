// MongoClient = require('mongodb').MongoClient;

//Destructuring - identical to code above
const {MongoClient, ObjectID} = require('mongodb');

//generates a new instance of an object ID
// let obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/todoapi', (err, db) => {
    if (err) {
        return console.log('unable to connect to mongodb server', err);
    } 

    // //insert a document into the collection
    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false,
    }, (err, result) => {
        if(err) {
           return console.log('unable to post note', err);
        }

        //result.ops = array of all documents that got added
        console.log(result.ops[0]._id.getTimestamp());
        
    });


    //inserts into collection Users
    db.collection('Users').insertOne({
        name: 'Becky',
        age: 63,
        location: 'New Brighton',
    }, (err, result) => {
        if(err) {
           return console.log('unable to post note', err);
        }

        console.log(result.ops);
        
    });

    console.log('connected to mongodb server');
    
    db.close();
});