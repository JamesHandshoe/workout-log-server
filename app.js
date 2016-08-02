require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var sequelize = require('./db.js');
var Feed = sequelize.import('./models/feed');

io.on('connection', function(socket){
	socket.on("chat-message", function(msg) {
		Feed.create(msg)
			.then(function(data){
				io.emit("chat-message", msg);
			});
	});
});

app.set("socketio",io);

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

//feed route
app.use('/api/feed', require('./routes/feed'));

//route with express
app.use('/api/test', function(req, res){
	res.send("hello world");
});

http.listen(process.env.PORT || 3000, function(){
	console.log("app is listening of port 3000");
});

