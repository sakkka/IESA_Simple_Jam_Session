$(document).ready(function(){ 
	//Chat and notifications
	$('.chatHeader').click(function(event) {
		$('.chatWindow').slideToggle("fast");
		
		if(currentStateOpened) {
			currentStateOpened = false;
		} else {
			// if i just opened it
			$(".inputMsg").focus();
			currentStateOpened = true;
			eraseNewMsgNotification();
		}
	});

		//Function who clean the input chat
	$('.sendMsg').click(function(){
		if($('#inputText').val()){
				$('#inputText').val('');
			}
	})

	// send message with Enter
	$(document).keyup(function(event){
		if((event.keyCode==13) && ($('#inputText').val()) && ($(".inputMsg").is(":focus")) ){
		
			emit(); // client.js function
			$('#inputText').val('');
		}
	});

});


var currentStateOpened = false;

//Change the header of the chat if a new message
function addNewMsgNotification() {
	if( !currentStateOpened ){
		$(".chatHeader").addClass("newMsgNotification");
	}
}

//Clean notification
function eraseNewMsgNotification() {
	$(".chatHeader").removeClass("newMsgNotification");
}

//Function who send message
function sendMsg(message, user){
	$('.msg').append('<p><span id="user">'+user+'</span> : '+message+'</p>');
	$('.msg').animate({ scrollTop: 1000000 }, "slow");
}