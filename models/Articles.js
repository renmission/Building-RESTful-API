const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articlesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = Articles = mongoose.model('article', articlesSchema);