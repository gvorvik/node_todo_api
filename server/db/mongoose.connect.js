const mongoose = require('mongoose');

const databaseUrl = process.env.MONGODB_URI;

mongoose.connect(databaseUrl);

mongoose.connection.on('connected', () => {
    console.log(`mongoose connected to ${databaseUrl}`);
});

mongoose.connection.on('error', () => {
    console.log('mongoose connection error:', error);    
});