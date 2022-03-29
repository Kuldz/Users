const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'qwe123';

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hashedpassword) {
        console.log(hashedpassword)
    });
});