const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isApproved:{
        type: Boolean,
        required: true
    },
    writer: {
        type: String,
        required: true
    }
},{collection: 'blogs'})
const model = mongoose.model('blogs', blogSchema)
module.exports = model;