
//   steps to create a srver 

// 1req express
const express = require('express');
// 2create instance
const app = express();


// 5 req dotenv
require('dotenv').config();
// 6 connect db
const connectDB = require('./config/connetDB');
connectDB();
// 7routing

// middelware glob
app.use(express.json());
// midell route
app.use('/api/user', require('./routes/user'));


//3 port
const PORT = process.env.PORT


// 4 create server
app.listen(PORT, (err) => {

    err ? console.err(err) : console.log(`server running on port ${PORT}...`);
});

