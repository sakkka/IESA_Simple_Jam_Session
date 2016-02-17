
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
		    	 $('.instrumentSelect').attr('id','theme'+$(this).attr('theme'));
		    	 $('#themeSelect').animate({
		    		height : 50
		  			}, 500, function(){
		  				theme.detach();
		  				$('.themeList').children().first().before(theme);
		  		});	     
		    });
		  });
	});


	//Instrument Select

	// show/hide 
 	$('.arrowIn').click(function(event) {
		$('.instrumentList').slideToggle("fast");
		$('.instrumentList').scrollLeft($('.instrumentList ul').width()/10);
	});

	//set witdh for ul
	nbInstrument = $('.instrumentList ul').children().length;
	$('.instrumentList ul').width((nbInstrument*210)+'px');
	

	//Scroll with mouse position	
	$('.instrumentList').on( "mousemove", function( event ) {
		if(event.pageX<200){
			navigateLeft(200-event.pageX+1);
		}

		if(event.pageX>($('.instrumentList').width()-200)){
			navigateRight(($('.instrumentList').width())-($('.instrumentList').width()-200))
		}
	});

	function navigateLeft(coeff){
		$('.instrumentList').scrollLeft($('.instrumentList').scrollLeft()-Math.round(coeff/10));
	}

	function navigateRight(coeff){
		$('.instrumentList').scrollLeft($('.instrumentList').scrollLeft()+Math.round(coeff/10));
	}

	//Select instrument
	$('.instrumentList li').click(function(event) {
		$('.instrumentList li.active').removeClass('active');
		$(this).addClass('active');
		$('.instrumentList').slideToggle("fast");
		});

	$('.instrumentList li').hover(function() {
		console.log('oui');
		$(this).children('p').fadeIn('fast');
	}, function() {
		$(this).children('p').fadeOut('fast');
	});


	//Chat
	$('.chatHeader').click(function(event) {
		$('.chatWindow').slideToggle("fast");
	});

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

	$(document).keyup(function(event){
		if((event.keyCode==13)&&($('.inputMsg').val()!='')&&($(".inputMsg").is(":focus"))){

			emit();
		}
	});

	
});

//Function who send message
function sendMsg(message,user){
	$('.msg').append('<p><span id="user">'+user+'</span> : '+message+'</p>');
	$('.inputMsg').val('');
	$('.msg').animate({ scrollTop: 1000000 }, "slow");

}