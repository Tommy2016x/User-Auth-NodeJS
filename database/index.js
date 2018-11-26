const mongoose = require('mongoose');

let connect = () => {
    const server = 'localhost:27017'; // REPLACE WITH YOUR DB SERVER
    const database = 'passport-tutorial';      // REPLACE WITH YOUR DB NAME

    mongoose.connect(`mongodb://${server}/${database}`)
        .then(() => {
            console.log('Database connection successful')
        })
        .catch(err => {
            console.error('Database connection error')
        })
}

module.exports = connect;