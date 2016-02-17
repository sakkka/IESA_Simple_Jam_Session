var server = require('./server')();
var socket = require('./socket')();

module.exports = function (app){
	"use strict";

	return {

		send : function(message) {
			console.log(message);
			app.socket.emit("chatMsg", message);
		},

		receive : function(content) {
			app.messages.emit("chatMsg", content);
		},

		isTyping : function () {

		}
	}
}