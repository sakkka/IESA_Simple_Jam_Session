module.exports = function (app){

	"use strict";

	return {
		_io : null,
		_clients : [],

		init : function() {
			this._io = require("socket.io")(app.server._server);

			//listening on client connections to server
			this.connect();
		},

		connect : function() {
			var _that = this;

			//on client connect
			this._io.on('connection', function(socket){ 

				var sessionid = socket.id;

				console.log("SERVER: Client "+sessionid+" connected !!");
				
				// add client to list
				_that._clients.push([sessionid, "guest", "room1"]);
				// listen to incomming msg
				_that.listen(socket);
				// listen to disconnect
				_that.disconnect(socket);

		 	});		
		},

		disconnect : function (s) {
			var _that = this;

		 	s.on('disconnect', function() {
		 		var sessionid = s.id;

		 		console.log("SERVER: Client "+app.utils.getNameBySocketId(s)+" disconnected"); // chez le server

		 		_that.emit('msg', {
					username : "Serveur",
					txt : app.utils.getNameBySocketId(s)+" s'est déconnecté", // chez le client
					room : app.utils.getRoomBySocketId(s)
				});
				var savedRoom = app.utils.getRoomBySocketId(s); // saving room to send disconnection event

		 		// deleting from client list
				for (var i=0; i<_that._clients.length; i++) {
					if(_that._clients[i][0] == sessionid) {
						_that._clients.splice(i,1);	
					}
				}

				// sending users left in room
				_that.emit('connectedUsers', {
					username : "Serveur",
					users : app.utils.getUsersByRoom(savedRoom),
					room : savedRoom
				});
				
		 	});
		},

		listen : function(s) {
			var _that = this;
			var sessionid = s.id;

			// receive msg
			s.broadcast.on('msg', function(content) {

				console.log("Received msg from: "+content.username+", content: "+content.txt+", for: "+content.room);
				_that.emit('msg', content);
			});

			//receive sound
			s.broadcast.on('sound', function(content) {
				console.log("User : "+content.username+" send sound : "+content.instrumentName+" with key :"+ content.keyCodeValue +" for the room" + content.room);

				_that.emitSound(s, 'sound', {
					instrumentName : content.instrumentName,
					keyCodeValue : content.keyCodeValue,	
					room : app.utils.getRoomBySocketId(s),
					username : app.utils.getNameBySocketId(s)

				});
				
			});

			// change nick
			s.on('changeNick', function(content) {
				console.log(app.utils.getNameBySocketId(s)+" changed his nickname to " +content);
	
				for (var i=0; i<_that._clients.length; i++) {
					if(_that._clients[i][0] == sessionid) {
						_that._clients[i][1] = content;
					}
				}
				
			});

			// change room
			s.on('changeRoom', function(content) {
				
				if(app.utils.isFullRoom(content)) {
					s.emit('changedRoom', {
						username : "Serveur",
						canChange : false,
						txt : "Impossible de changer de room (FULL)",
						room : app.utils.getRoomBySocketId(s)
					});
					console.log(app.utils.getNameBySocketId(s)+" CANT change his ROOM to " +content+" (FULL)");
					return;

				} else {
					s.emit('changedRoom', {
						username : "Serveur",
						canChange : true,
						txt : app.utils.getNameBySocketId(s)+" a changé sa ROOM par "+content,
						room : content.room
					});
				}
				console.log(app.utils.getNameBySocketId(s)+" changed his ROOM to " +content);

				for (var i=0; i<_that._clients.length; i++) {
					if(_that._clients[i][0] == sessionid) {
						_that._clients[i][2] = content;
					}
				}

				s.leave(app.utils.getRoomBySocketId(s));
				s.join(content);
			});

			//change instrument
			s.on('changeInstrument', function(content) {
				console.log(app.utils.getNameBySocketId(s)+" change his instrument to " +content);
				console.log(content.room)
				
				_that.emit('msg', {
					username : "Serveur",
					txt : app.utils.getNameBySocketId(s)+" a changé son instrument par " + content,
					room : app.utils.getRoomBySocketId(s)
				});
			});

			// send a list of conenected users in the room
			s.on('getConnectedUsers', function(data) {
				console.log("Sending user list to "+data.username+", for room " +data.room);
				
				_that.emit('connectedUsers', {
					username : "Serveur",
					users : app.utils.getConnectedUsers(s),
					room : data.room
				});

				console.log("SERVER: List: "+JSON.stringify(_that._clients));

			});

		},

		emit : function (chan, data) {
			// emit any message etc
			this._io.in(data.room).emit(chan, data);	
		},

		emitSound : function (s, chan, data) {
			// send the code for the sound
			s.broadcast.to(data.room).emit(chan, data);
		}
	}
};
