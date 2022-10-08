const express = require('express');
const app = express();
const router = express.Router();
var path = require('path');
const fs = require('fs');

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, 'user.json'));
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req, res) => {
  let data = fs.readFileSync('user.json');
  let user = JSON.parse(data);
  let username = req.query.username;
  let password = req.query.password;
  res.setHeader('Content-Type', 'application/json');

  if (username != user.username) {
    res.end(JSON.stringify({ status: false, message: 'User Name is invalid' }));
  } else if (password != user.password) {
    res.end(JSON.stringify({ status: false, message: 'Password is invalid' }));
  } else {
    res.end(JSON.stringify({ status: true, message: 'User Is valid' }));
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req, res) => {
  let username = req.query.username;
  let password = req.query.password;

  res.setHeader('Content-Type', 'text/html');
  res.send(`
  <b>${username} successfully logout.<b>
  `);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port ' + (process.env.port || 8081));
