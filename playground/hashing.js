const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

//generates a salt
bcrypt.genSalt(10, (err, salt) => {
    //creates hashed password
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

let hashedPassword = '$2a$10$hPPTZU0iZQ2jvI4WkCfoUedDVII2.I1/t65rq/XqMyly0JYGsxViG';

//compares password with hashed password
bcrypt.compare(password, hashedPassword, (err, result) => {
    console.log(result);
});


// let data = {
//     id: 10
// };

// //takes object and signs it
// //value sent back to user when they log in
// let token = jwt.sign(data, 'saltstring');
// console.log(token);


// //takes token and secret and makes sure it was not manipulated
// let decoded = jwt.verify(token, 'saltstring');
// console.log(decoded);


// let message = 'I am user number three';
// let hash = SHA256(message).toString();

// console.log(message);
// console.log(hash);

// let data = {
//     id: 4
// };

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'saltstring').toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data).toString())

// let resultHash = SHA256(JSON.stringify(token.data) + 'saltstring').toString();

// if(resultHash === token.hash) {
//     console.log('data was not changed');
// } else {
//     console.log('data changed - DO NOT TRUST');
// }
