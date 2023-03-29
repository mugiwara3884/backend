const express = require('express')
const bodyParser = require('body-parser')
const cors=require('cors')
const userRoutes=require('./routes/user')

const sequelize=require('./util/database')
const new_user =  require('./routes/add_user')
const add_group  = require('./routes/add_group')
const app=express();

app.use(cors())
app.use(bodyParser.json({extended:false}))
app.use(bodyParser.urlencoded({extended:false}))

app.use(userRoutes)
app.use(new_user)
app.use(add_group)

sequelize.sync().then(response=>{
    // console.log(response)
    app.listen(process.env.PORT || 3000, ()=>console.log("Server started running on Port: 3000"))
}).catch(err=>console.log(err))

