const { MongoClient, ObjectID } = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/todoapi', (err, db) => {
    if (err) {
        return console.log('unable to connect to mongodb server', err);
    }

    //delete many
    db.collection('Todos')
        .deleteMany({ completed: true })
        .then(((result) => {
            console.log(result);
        }));

    //delete one
    db.collection('Todos')
        .deleteOne({ text: 'Eat Lunch' })
        .then((result) => {
            console.log(result);
        });

    //findOneAndDelete
    //this will return the document that was deleted!!!
    db.collection('Todos')
        .findOneAndDelete({completed: false})
        .then((result) => {
            console.log(result); 
        })

        
    console.log('connected to mongodb server');

    db.close();
});