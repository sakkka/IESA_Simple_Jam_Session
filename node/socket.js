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
				console.log("SERVER: List: "+JSON.stringify(_that._clients));

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

		 		console.log("SERVER: Client "+_that.getNameBySocketId(s)+" disconnected"); // chez le server
				
				_that.emit('msg', {
					username : "Serveur",
					txt : _that.getNameBySocketId(s)+" s'est déconnecté", // chez le client
					room : _that.getRoomBySocketId(s)
				});

				// deleting from client list
				for (var i=0; i<_that._clients.length; i++) {
					if(_that._clients[i][0] == sessionid) {
						_that._clients.splice(i,1);	
					}
				}

		 	})
		},

		listen : function(s) {
			var _that = this;
			var sessionid = s.id;

			
			// on new client connect
			s.broadcast.emit('msg', {
				username : "Serveur",
				txt : "un client s'est connecté",
				room: _that.getRoomBySocketId(s)
			});

			// receive msg
			s.broadcast.on('msg', function(content) {

				console.log("Received msg from: "+_that.getNameBySocketId(s)+", content: "+content.txt+", for: "+content.room);

				var contentWithSender = {
					username : _that.getNameBySocketId(s), 
					txt : content.txt,
					room : _that.getRoomBySocketId(s)
				};

				_that.emit('msg', contentWithSender);
			});

			//receive sound
			s.broadcast.on('sound', function(content) {
				console.log("Received sound : "+content.instrumentName+" with key :"+ content.keyCodeValue +" for the room" + content.room);

				_that.emitSound(s, 'sound', {
					instrumentName : content.instrumentName,
					keyCodeValue : content.keyCodeValue,	
					room : _that.getRoomBySocketId(s)
				});
				
			});

			// change nick
			s.on('changeNick', function(content) {
				console.log(_that.getNameBySocketId(s)+" changed his nickname to " +content);

				/*
				_that.emit('msg', {
					username : "Serveur",
					txt : _that.getNameBySocketId(s)+" a changé son nom par "+content,
					room : _that.getRoomBySocketId(s)
				});
				*/
	
				for (var i=0; i<_that._clients.length; i++) {
					if(_that._clients[i][0] == sessionid) {
						_that._clients[i][1] = content;
					}
				}
				
			});

			// change room
			s.on('changeRoom', function(content) {
				
				if(_that.isFullRoom(content)) {
					s.emit('changedRoom', {
						username : "Serveur",
						canChange : false,
						txt : "Impossible de changer de room (FULL)",
						room : _that.getRoomBySocketId(s)
					});
					console.log(_that.getNameBySocketId(s)+" CANT change his ROOM to " +content+" (FULL)");
					return;

				} else {
					s.emit('changedRoom', {
						username : "Serveur",
						canChange : true,
						txt : _that.getNameBySocketId(s)+" a changé sa ROOM par "+content,
						room : content.room
					});
				}
				console.log(_that.getNameBySocketId(s)+" changed his ROOM to " +content);

				for (var i=0; i<_that._clients.length; i++) {
					if(_that._clients[i][0] == sessionid) {
						_that._clients[i][2] = content;
					}
				}

				s.leave(_that.getRoomBySocketId(s));
				s.join(content);
			});

			//change instrument
			s.on('changeInstrument', function(content) {
				console.log(_that.getNameBySocketId(s)+" change his instrument to " +content);
				console.log(content.room)
				
				_that.emit('msg', {
					username : "Serveur",
					txt : _that.getNameBySocketId(s)+" a changé son instrument par " + content,
					room : _that.getRoomBySocketId(s)
				});
			});

			s.on('getConnectedUsers', function(data) {
				console.log("Sending user list to "+data.username+", for room " +data.room);
				
				_that.emit('connectedUsers', {
					username : "Serveur",
					users : _that.getConnectedUsers(s),
					room : _that.getRoomBySocketId(s)
				});
			});

		},

		emit : function (chan, data) {
			//console.log("EMIT : "+JSON.stringify(data));
			
			this._io.in(data.room).emit(chan, data);
			
			//this._io.emit(chan, data.content);
		},

		emitSound : function (s, chan, data) {
			//send the code for the sound
			s.broadcast.to(data.room).emit(chan, data);
		},


		getNameBySocketId : function(s) {
			var _that = this;

			var sessionid = s.id;

			for (var i=0; i<_that._clients.length; i++) {
				if(_that._clients[i][0] == sessionid) {
					return _that._clients[i][1];
				}
			}
		},

		getRoomBySocketId : function(s){
			var _that = this;

			var sessionid = s.id;

			for (var i=0; i<_that._clients.length; i++) {
				if(_that._clients[i][0] == sessionid) {
					return _that._clients[i][2];
				}
			}
		},

		getConnectedUsers : function(s){
			var _that = this;
			var room = _that.getRoomBySocketId(s);
			var clients = [];

			for (var i=0; i<_that._clients.length; i++) {
				if(_that._clients[i][2] == room) {
					clients.push(_that._clients[i]);
				}
			}
			return clients;
		},

		isFullRoom : function (roomname) {
			var _that = this;
			var cpt = 0;

			for (var i=0; i<_that._clients.length; i++) {
				if (_that._clients[i][2] == roomname) {
					cpt ++;
				}
			}
			if(cpt>=5) { // room max users
				console.log("Full rooom !!! "+roomname);
				return true;
			}

			return false;
		}
	}
};