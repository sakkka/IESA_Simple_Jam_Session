var socket = io();

var myData = {
	name : "guest",
	room : "room1"
}

function emit() {
	var txt = $("#inputText").val();
	console.log(myData.name+" sending : "+txt+", to : "+myData.room);

	socket.emit('msg', {
		username : myData.name,
		room : myData.room,
		txt : txt
	});

	socket.emit('join', {		
		room : myData.room		
	});
}

function emitSound(instrument,keyCode) {
	socket.emitSound('sound', {
		instrumentName : instrument,
		keyCodeValue : keyCode,
		room : myData.room
	})
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

socket.on('msg', function(data) {
	console.log("msg from "+data.username+" received: "+data.txt);

	$("#chat").append(data.username+": "+data.txt+"<br>");

});

socket.on('join', function(data) {
	console.log('CB: +'data.room);
})