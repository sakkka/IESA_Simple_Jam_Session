module.exports = function (app){

	"use strict";

	return {
		_maxUsersByRoom : 5,

		getNameBySocketId : function(s) {
			var sessionid = s.id;

			for (var i=0; i<app.socket._clients.length; i++) {
				if(app.socket._clients[i][0] == sessionid) {
					return app.socket._clients[i][1];
				}
			}
		},

		getRoomBySocketId : function(s){
			var sessionid = s.id;

			for (var i=0; i<app.socket._clients.length; i++) {
				if(app.socket._clients[i][0] == sessionid) {
					return app.socket._clients[i][2];
				}
			}
		},

		getUsersByRoom : function(room) {

			var clients = [];
			for (var i=0; i<app.socket._clients.length; i++) {
				if(app.socket._clients[i][2] == room) {
					clients.push(app.socket._clients[i]);
				}
			}
			return clients;
		},

		getConnectedUsers : function(s){
			var room = this.getRoomBySocketId(s);
			var clients = [];

			for (var i=0; i<app.socket._clients.length; i++) {
				if(app.socket._clients[i][2] == room) {
					clients.push(app.socket._clients[i]);
				}
			}
			return clients;
		},

		isFullRoom : function (roomname) {
			var cpt = 0;
			var _that = this;
			for (var i=0; i<app.socket._clients.length; i++) {
				if (app.socket._clients[i][2] == roomname) {
					cpt ++;
				}
			}
			if(cpt>=_that._maxUsersByRoom) { // room max users
				console.log("Full rooom !!! "+roomname);
				return true;
			}

			return false;
		}
	}
};