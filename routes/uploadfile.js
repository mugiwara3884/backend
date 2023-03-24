const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' }); 
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // do something with the uploaded file here, e.g. save it to a database
  
    res.send('File uploaded successfully!');
  });
  