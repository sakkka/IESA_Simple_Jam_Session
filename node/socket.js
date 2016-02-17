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
					username : "Console",
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
			s.join('room1');

			s.broadcast.emit('msg', {
				username : "Console",
				txt : "nouveau client connecté",
				room: _that.getRoomBySocketId(s)
			});


			// receive msg
			s.on('msg', function(content) {

				console.log("Received msg from: "+_that.getNameBySocketId(s)+", content: "+content.txt+", for: "+content.room);

				var contentWithSender = {
					username : _that.getNameBySocketId(s), 
					txt : content.txt,
					room : content.room
				};

				_that.emit('msg', contentWithSender);
			});

			// change nick
			s.on('changeNick', function(content) {
				console.log(_that.getNameBySocketId(s)+" changed his nickname to " +content);
				
				_that.emit('msg', {
					username : "Console",
					txt : _that.getNameBySocketId(s)+" a changé son nom par "+content,
					room : content.room
				});

				for (var i=0; i<_that._clients.length; i++) {
					if(_that._clients[i][0] == sessionid) {
						_that._clients[i][1] = content;
					}
				}
				
			});

			// change room
			s.on('changeRoom', function(content) {
				console.log(_that.getNameBySocketId(s)+" changed his ROOM to " +content);
				
				_that.emit('msg', {
					username : "Console",
					txt : _that.getNameBySocketId(s)+" a changé sa ROOM par "+content,
					room : content.room
				});

				for (var i=0; i<_that._clients.length; i++) {
					if(_that._clients[i][0] == sessionid) {
						_that._clients[i][2] = content;
					}
				}
				
				s.join(content);
			});

		},

		emit : function (chan, data) {
			//console.log("EMIT : "+JSON.stringify(data));
			
			this._io.in(data.room).emit(chan, data);
			
			//this._io.emit(chan, data.content);
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
		}
	}

}