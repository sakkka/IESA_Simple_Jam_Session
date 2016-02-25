
var socket = io();
//var cookie = require('cookie');

var myData = {
	name : getCookie('nickname'),
	room : getCookie('room'),
	instrument : "bass"
};


function emitSound(instrument, keyCode){
	socket.emit('sound', {
		instrumentName : instrument,
		keyCodeValue : keyCode,
		room : myData.room
	});
}

function emit() {
	var txt = $("#inputText").val();
	console.log(myData.name+" sending : "+txt+", to : "+myData.room);
	socket.emit('msg', {
		username : myData.name,
		room : myData.room,
		txt : txt
	});
}

function changeInstrument(instrumentName){
	console.log("changing INSTRUMENT to: "+instrumentName);
	socket.emit('changeInstrument', instrumentName );
	myData.instrument = instrumentName ;
}

function changeNick(nickname) {

	console.log("changing NAME to: "+nickname);
	socket.emit('changeNick', nickname);
	myData.name = nickname;
}


function changeRoom(room) {	

	console.log("changing ROOM to: "+room);
	socket.emit('changeRoom', room);
	socket.on('changedRoom', function(data) {
		console.log("can change room : "+JSON.stringify(data));
		if(data.canChange) {
			myData.room = room;
		}
	});
	
}


function getConnectedUsers() {
	console.log("Getting connected users ....");
	socket.emit('getConnectedUsers', {
		username : myData.name,
		room : myData.room
	});
}


changeNick(myData.name);
changeRoom(myData.room);

getConnectedUsers();

// recieve messages, sounds and connected users
if(socket != null ){

	socket.on('msg', function(data) {
		console.log("Msg from "+data.username+", received: "+data.txt);

		addNewMsgNotification(); //interface.js
		sendMsg(data.txt, data.username); //interface.js
	});

	socket.on('sound',function(data) {		
		playSendSound(data.instrumentName,data.keyCodeValue); //pad.js
	});

	socket.on('connectedUsers',function(data) {		
		console.log("Connected users : "+JSON.stringify(data.users));
		printConnectedUsers(data.users); //interface.js
	});
}

