const express = require('express');
const bodyparser = require('body-parser');

const db = require('./database');

db();

const users = require('./routes/api/users')

const app = express();

app.use(bodyparser.json());
app.use('/users',users);

app.listen(3000);

console.log('listening on port 3000');
