const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    user: {
        type: String,
        required: [true, 'add name']
    },
    email: {
        type: String,
        required: [true, 'add email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'add passwword']
    },
},
{
    timestamps: true,
  })

module.exports = mongoose.model('Users', userSchema)