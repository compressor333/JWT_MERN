const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB connected ${res.connection.host}`.magenta.bgBrightBlue)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb