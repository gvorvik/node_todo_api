const { MongoClient, ObjectID } = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/todoapi', (err, db) => {
    if (err) {
        return console.log('unable to connect to mongodb server', err);
    }

    //findOneAndUpdate
    db.collection('Todos')
        .findOneAndUpdate({
            _id: new ObjectID("5afe4b06d78dbc86e73823a9")
        },
            {
                $set: {
                    completed: true
                },
            }, {
                returnOriginal: false
            })
        .then((result) => {
            console.log(result);
        })

    db.collection('Users')
        .findOneAndUpdate({
            _id: new ObjectID("5afe491ce7f80806b754195d")
        }, {
            $set: {
                name: 'Rebecca'
            },
            $inc: {
                age: 1
            }
        }, {
            //returns updated document rather than original (this is defaulted to true, which is why we're switching it!!)
            returnOriginal: false
        })
        .then((result) => {
            console.log(result);
            
        })

    console.log('connected to mongodb server');

    db.close();
});