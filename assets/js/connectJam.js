$(document).ready(function() {
	
	$('#jamConnect').click(function(){
		console.log('test');
		if(($('#room').val()!='')&&($('#nickname').val()!='')){
			document.cookie="nickname="+$('#nickname').val();
			document.cookie="room="+$('#room').val();
			document.location.href="/play";
		}
	});
})