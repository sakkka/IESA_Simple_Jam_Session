
var express = require('express');
var exp = require('express')();
var http = require('http');
var path = require('path');


module.exports = function() {
	"use strict";

	return {
		_server : null,
		//res.sendFile(path.resolve('temp/index.html'));

		//init server

		create : function() {
			this._server = http.createServer(exp);

			this.route();

			this.listen(3000);
		},

		//listen on port

		listen : function(port) {
			this._server.listen(port, function() {
				console.log("SERVER: Listening on port: "+port);
			})
		},

		//create a route for index.html

		route : function() {

			// adding css and js files
			exp.use(express.static(path.resolve('../assets/css')));
			exp.use(express.static(path.resolve('../assets/js')));
			exp.use(express.static(path.resolve('../assets/img')));


			exp.get('/', function(req, res) {
				res.sendFile(path.resolve("../html/index.html"));
			});

			exp.get('/connect', function(req, res) {
				res.sendFile(path.resolve("../html/connect.html"));
			});

			exp.get('/jam-create', function(req, res) {
				res.sendFile(path.resolve("../html/pad.html"));
			});

			exp.get('/play', function(req, res) {
				res.sendFile(path.resolve('../html/pad.html'));
			});

			exp.post('/play', function(req, res) {
				//console.log("Sended name: "+req.body.nickname);
			  	res.sendFile(path.resolve('../html/pad.html'));
			});
		}
	}
}