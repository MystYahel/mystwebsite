const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  console.log('server started');
})

router.get('/About', (req, res) => {
  res.sendFile(__dirname + '/about.html');
})

router.get('/Blog', (req, res) => {
  res.sendFile(__dirname + '/blog.html');
})

router.get('/Contact', (req, res) => {
  res.sendFile((__dirname + '/contact.html'));
})

router.get('/Login', (req, res) => {
  res.sendFile((__dirname + '/login.html'));
})

module.exports = router;
