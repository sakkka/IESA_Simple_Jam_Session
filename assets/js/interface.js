$(document).ready(function(){ 

	//Theme Picker
	$('.themeList li').hover(function() {
		$(this).css('border','2px solid white');
	}, function() {
		$(this).css('border','2px solid transparent');
	});

	$('#arrowDown').click(function(event) {
		var nbTheme = $('.themeList li').length
		$('#themeSelect').animate({
		    height : 50*nbTheme
		  }, 500, function() {
		  	//If a theme is chosen
		    $('.themeList li').click(function(event) {
		    	 var theme = $(this);
		    	 $('.pad').attr('id','theme'+$(this).attr('theme'));
		    	 $('#themeSelect').animate({
		    		height : 50
		  			}, 500, function(){
		  				theme.detach();
		  				$('.themeList').children().first().before(theme);
		  		});	     
		    });
		  });
	});


	//Chat
	$('.chatHeader').click(function(event) {
		$('.chatWindow').slideToggle("fast");
	});
	//On push enter key
	


	//On click to the send button
	/*
	$('.sendMsg').click(function(event) {		
			if($('.inputMsg').val()!=''){
			var message = $('.inputMsg').val();
			var user = 'Clément'
			sendMsg(message,user);
		}
			
	});
	*/

	/* 
	switch between chat and pad
	
	$(document).keyup(function(event){
		if(event.keyCode==16) {
			if ($(".inputMsg").is(':focus')) {

				$(".pad").focus();
				//$(".inputMsg").blur();
				alert("focus");
			}

			$(".inputMsg").focus();
		}
	});
	*/
});

function sendMsg(message,user){
	$('.msg').append('<p><span id="user">'+user+'</span> : '+message+'</p>');
	$('.inputMsg').val('');
	$('.msg').animate({ scrollTop: 1000000 }, "slow");

}