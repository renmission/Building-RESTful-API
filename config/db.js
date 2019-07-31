const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/wikiDB', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('DB CONNECTED');
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = connectDB;