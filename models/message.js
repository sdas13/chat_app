const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    sender: {
        type: String
    },
    content: {
        type: String
    },
    time_created: {
        type: Date
    },
    conversationId: {
        type: Number
    }
})

module.exports = mongoose.model('Message', messageSchema);