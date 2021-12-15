const mongoose = require('mongoose');
const writerSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{collection: 'writer'} 
)
const model = mongoose.model('writer', writerSchema)
module.exports = model;