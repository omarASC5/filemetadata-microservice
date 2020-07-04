'use strict';
// link to project: https://useful-savory-rabbit.glitch.me/api/fileanalyse
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// require and use "multer"...
const multer = require('multer');
const app = express();
const upload = multer();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', (req, res) => {
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    return next(error);
  }
  res.json({
    name: file['originalname'],
    type: file['mimetype'],
    size: file['size']
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Node.js listening ...');
});
