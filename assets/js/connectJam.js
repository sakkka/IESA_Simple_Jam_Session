$(document).ready(function() {
	
	$('#jamConnect').click(function (){
		$('.error').text('');
		if(( $('#room').val()!='' )&&( $('#nickname').val()!='') ){
			document.cookie="nickname="+$('#nickname').val();
			document.cookie="room="+$('#room').val();
			document.location.href="/play";
		}

		if( $('#nickname').val()=='' ){			
			$('.error').text('Pseudo requis ! ');
				$('#nickname').change(function(){
					$('.errorLogin').text('');
				})	
		}
		if( $('#room').val()=='' ){				
			$('.error').text($('.error').text()+'Room requis !');
				$('#nickname').change(function(){
					$('.errorLogin').text('');
				})	
		}
	});
	//connect with enter
	$(document).keyup(function(event){
		if( event.keyCode==13 ){
			console.log("ENTER !!");
			$('#jamConnect').click();
		}
	});

	//Clean cookie alert
	$('#close').click(function(){
		$('.alerteCookie').slideToggle('fast');
	})

});