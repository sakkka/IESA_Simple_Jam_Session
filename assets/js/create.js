$(document).ready(function(){
	var url = window.location.href;
	var number =  url.match("room=(.*)");
	if(number){
		$('#room').val(number[1]);
	}
});