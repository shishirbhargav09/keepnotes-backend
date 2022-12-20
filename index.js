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

app.get("/",(req,res) => {
  res.send("Welcome To Task Manager Api")
  res.send("Endpoints : /api/auth/createuser(Post)  ,  /api/auth/login(Post) ,  /api/notes/fetchallnotes(get),  /api/notes/addnote(Post)   /api/notes/updatenote/:id(Put)    /api/notes/deletenote/:id(Delete)")
})

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
  }
  app.listen(port);