const mongoose = require('mongoose');
const express = require('express')
var cors = require('cors') 
require('dotenv').config();
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection
database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})
const app = express()


app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
  }
  app.listen(port);