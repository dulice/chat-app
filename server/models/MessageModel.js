const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    content: String,
    from: Object,
    to: String,
    socketId: String
}, {timestamps: true});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;