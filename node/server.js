
var express = require('express');
var exp = require('express')();
var http = require('http');
var path = require('path');
var port = 3000;
var bodyParser  = require('body-parser');


module.exports = function() {
	"use strict";

	return {
		_server : null,
		//init server
		create : function() {
			this._server = http.createServer(exp);
			this.route();
			this.listen(port);
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
			exp.use(express.static(path.resolve('../samples')));
			exp.use(express.static(path.resolve('../samples/bass')));

			exp.set('views', '../html');
			
			//conf
			exp.use(bodyParser.urlencoded({
				extended: true
			}));
			exp.use(bodyParser.json());
			// END conf

			exp.get('/', function(req, res) {
				res.sendFile(path.resolve("../html/index.html"));
			});

			exp.get('/create', function(req, res) {
				res.sendFile(path.resolve("../html/create.html"));
			});

			exp.get('/join', function(req, res) {
				res.sendFile(path.resolve("../html/join.html"));
			});

			exp.get('/play', function(req, res) {
				res.sendFile(path.resolve('../html/pad.html'));
			});

			exp.post('/play', function(req, res) {
				//console.log("Sended name: "+req.body.nickname);

				console.log(req.body);


				res.sendFile(path.resolve('../html/pad.html'));


				/*
				if(isEmpty(req.body) {
					res.sendFile(path.resolve('../html/index.html'));
				} else {
					res.sendFile(path.resolve('../html/pad.html'));
				}
				*/

							    
			  	
			});
		}
	}
};