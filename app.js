require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');

console.log(process.env.JWT_SECRET);
//syncs the virtual table with the postgres table
sequelize.sync({}); //to drop a table  sequelize.sync({force: true}); drops the table and recreates it

app.use(bodyParser.json());

//this is used to provide access with headers
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));

//routes to routes/user.js
app.use('/api/user', require('./routes/user'));

//login route to sessions.js to authenticate a session
app.use('/api/login', require('./routes/session'));

//definitions route
app.use('/api/definition', require('./routes/definition'));

// log route
app.use('/api/log', require('./routes/log'));
//route with express
app.use('/api/test', function(req, res){
	res.send("hello world");
});

app.listen(3000, function(){
	console.log("app is listening of port 3000");
});

