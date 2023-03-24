const express = require('express')

const cors=require('cors')
const app = express()
const path=require('path');
const bodyParser = require('body-parser');
const login = require('./routes/auth')
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json());
app.use(require('./routes/auth'))

app.listen(3000,()=>{
console.log("server started at 3000 port")
})

