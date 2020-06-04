const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: 500
    },
    likes: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
});

module.exports = mongoose.model('Meme', schema);
