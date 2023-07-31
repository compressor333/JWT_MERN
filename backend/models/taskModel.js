const mongoose = require('mongoose')

const tasksSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users',
      },
    text: {
        type: String,
        required: [true, 'please add something']
    },
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Tasks', tasksSchema)