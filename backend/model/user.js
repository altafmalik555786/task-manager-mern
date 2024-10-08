const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('User', dataSchema)