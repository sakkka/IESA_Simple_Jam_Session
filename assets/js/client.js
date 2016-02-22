
var socket = io();
//var cookie = require('cookie');

var myData = {
	name : "guest",
	room : "room1",
	instrument : "bass"
};

//$(".sendMsg").click(emit());

console.log(document.cookie);


function emit() {
	var txt = $("#inputText").val();
	console.log(myData.name+" sending : "+txt+", to : "+myData.room);

	//sendMsg(myData.name, myData.txt);

	socket.emit('msg', {
		username : myData.name,
		room : myData.room,
		txt : txt
	});
}

function changeInstrument(instrumentName){
	
	console.log("changing INSTRUMENT to: "+instrumentName);
	socket.emit('changeInstrument', instrumentName );
	// A FAIRE : controle de reception changeNick -> nickChanged
	myData.instrument = instrumentName ;

}

function changeNick() {
	var nickname = $("#nickname").val();
	console.log("changing NAME to: "+nickname);
	socket.emit('changeNick', nickname);
	// A FAIRE : controle de reception changeNick -> nickChanged
	myData.name = nickname;
}

function changeRoom() {
	var room = $("#room").val();
	console.log("changing ROOM to: "+room);
	socket.emit('changeRoom', room);
	// A FAIRE : controle de reception changeNick -> nickChanged
	myData.room = room;
}

if(socket != null ){
	socket.on('msg', function(data) {
		console.log("msg from "+data.username+" received: "+data.txt);

		addNewMsgNotification(); //interface.js

		sendMsg(data.txt, data.username); //interface.js
	});
}

