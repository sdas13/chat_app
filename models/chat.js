const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Chat', ChatSchema);