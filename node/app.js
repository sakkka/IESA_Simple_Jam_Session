var app = {};

app.server = require("./server")();
app.server.create();

app.socket = require("./socket")(app);
app.socket.init();

//app.messages = require("./socket")(app);

/*
io.on('connection', function(socket){ 

	console.log("SERVER: Incomming connexion !!");

	socket.on('msg', function(content){
		console.log(content);

		socket.emit('confirm', "super reponse du server");
	});

 });
*/

