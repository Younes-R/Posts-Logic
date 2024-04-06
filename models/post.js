const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create post schema
const postSchema = new Schema({
    startPoint: { type: String, required: true, },
    endPoint: { type: String, required: true, },
    body: { type: String, required: true, },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema );

module.exports = Post;