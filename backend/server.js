const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv') //environmental variables
const cors = require('cors') //middleware
const bodyParser = require('body-parser')
const path = require('path')
const fileRoutes = require('./src/routes/file-upload-routes')

//const APIs
const Role = require('./src/models/role.model')

//import APIs
const authAPI = require('./src/apis/auth.api') 
const userAPI = require('./src/apis/user.api') 
const employeeAPI = require('./src/apis/employee.api') 
const fileAPI = require('./src/apis/file.api') 

dotenv.config()
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use(express.json())
app.use(express.urlencoded({ extened: true }))

//port no for run backend server
const PORT = process.env.PORT || 8066
const MONGODB_URI = process.env.MONGODB_URI

//connect to database
mongoose.connect(
  MONGODB_URI,
  {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  },
  (error) => {
    if (error) {
      console.log('Database Error: ', error.message)
    }
  }
)

//open connection
mongoose.connection.once('open', () => {
  console.log('Database Synced')
  initial()
})

//root route
app.route('/').get((req, res) => {
  res.send('SSD Assignment 2')
})

app.use('/auth', authAPI()) 
app.use('/user', userAPI()) 
app.use('/employee', employeeAPI()) 
app.use('/file', fileAPI()) 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api', fileRoutes.routes)

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`)
})

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'worker',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'worker' to roles collection")
      })

      new Role({
        name: 'manager',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'manager' to roles collection")
      })

      new Role({
        name: 'admin',
      }).save((err) => {
        if (err) {
          console.log('error', err)
        }

        console.log("added 'admin' to roles collection")
      })
    }
  })
}
