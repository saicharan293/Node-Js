const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    postText: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Array,
        default: [],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema); 
