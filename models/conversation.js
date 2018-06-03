const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    id: {
        type: Number,
        unique:true
    },
    participants: {
        type: [String]
    }
})

module.exports = mongoose.model('Conversation', conversationSchema);