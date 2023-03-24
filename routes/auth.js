const express = require('express');
const router = express.Router()
const {Client} = require('pg')
const { v4: uuidv4 } = require('uuid');
const jwtGenerator = require("../utils/jwtGenerator");
const authorization  = require('../middleware/authorization')
const client = new Client({
   user:"acmeace",
   password:"Cms@351",
   host:"10.10.0.38",
   port:"5432",
   database:"dms",
})
client.connect((err) => {
   if (err) {
     console.error('Database connection failed: ', err.stack);
   } else {
     console.log('Database connected successfully');
   }
 });
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

router.post('/signup',async(req,res)=>{
const { username, lastname, email, password, role } = req.body;

const dmsquery = `INSERT INTO users (id,username, lastname, email, password, role)
                      VALUES ($1, $2, $3, $4, $5,$6)
                      RETURNING *`;

const id = uuidv4();
const uuidString = id
const uuidArray = uuidString.split('-');
const id1 = uuidArray[0]      
bcryptPassword  = await bcrypt.hash(password,10)
const values = [id1,username, lastname, email, bcryptPassword, role];
client.query(dmsquery, values, (err, dbres) => {
      if (err) {
        console.error('Error inserting data: ', err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Data inserted successfully: ', dbres.rows[0]);
        res.status(201).json(dbres.rows[0]);
      }
    });
})
   
 




router.post("/login", async (req, res) => {
    const {
      email,
      password
    } = req.body;
    console.log(email, password);
  
    try {
      const user = await client.query(
        `SELECT * FROM users WHERE email = '${email}'`
      );
      if (user.rows.length === 0) {
        return res.status(401).json("Invalid Credential");
      }
     
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (!validPassword) {
        return res.status(401).json("Invalid Credential");
      }
      const token = jwtGenerator(user.rows[0].id,user.rows[0].username,user.rows[0].email)
      let userDetails = user.rows[0];
      let email1 = user.rows[0].email
      delete userDetails.password;
      return res.status(200).json({
        token,
        "username":userDetails.username,
        "email":email1,
        "role":user.rows[0].role

      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

module.exports=router

