const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
    id: 10
};

//takes object and signs it
//value sent back to user when they log in
let token = jwt.sign(data, 'saltstring');
console.log(token);


//takes token and secret and makes sure it was not manipulated
let decoded = jwt.verify(token, 'saltstring');
console.log(decoded);


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
