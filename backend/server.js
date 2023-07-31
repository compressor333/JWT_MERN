const express = require('express')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDb = require('./config/db')
const PORT = process.env.PORT
const taskRoutes = require('./routes/taskRoutes')
const userRoutes = require('./routes/userRoutes')
const {errorHandler} = require('./middleware/errorMiddleware')
const cors = require('cors')
const path = require('path');

const app = express()
app.use(cors())

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDb()

app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')));
//     app.get('*', (req, res) =>
//       res.sendFile(
//         path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//       )
//     );
//   } else {
//     app.get('/', (req, res) => res.send('Please set to production'));
//   }
// app.use(errorHandler)
app.listen(PORT, () => console.log(`server listenning on port: ${PORT}`.bgGreen))






