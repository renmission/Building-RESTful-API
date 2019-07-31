const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Articles = require('./models/Articles');

const app = express();

//Connect Database
connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Define routes
app.use('/api/articles', require('./routes/api/articles'));


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server start on port ${port}`);
})