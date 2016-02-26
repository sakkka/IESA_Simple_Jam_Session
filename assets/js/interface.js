$(document).ready(function(){ 

	//If a theme is in cookie, then current theme = cookie theme
	document.cookie="instrument=bass";
	if(!getCookie('theme')){
		document.cookie="theme=1";
	}else{
		$('.pad').attr('id','theme'+getCookie('theme'));
		$('.instrumentSelect').attr('id','theme'+getCookie('theme'));
		var theme = $('li#t'+getCookie('theme'));
		theme.detach();
		$('.themeList').children().first().before(theme);

	}

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
		    	 document.cookie="theme="+$(this).attr('theme');
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

	//Share

	//show/hide 
	$('.shareHeader').click(function(event) {
		$('.shareContent').slideToggle("fast");		
	});

	//automatic copy url
	$('.copyURL').click(function(){		
		$('#urlRoom').select();
		document.execCommand("copy");
		$('.shareContent').slideToggle("fast");	

	})

	$('#urlRoom').click(function(){
		$(this).select();
	});


	//Instrument Select

	// show/hide 
 	$('.arrowIn').click(function(event) {
		$('.instrumentList').slideToggle("fast");
		$('.instrumentList').scrollLeft($('.instrumentList ul').width()/10);
	});

	//set witdh for ul
	nbInstrument = $('.instrumentList ul').children().length;
	$('.instrumentList ul').width(((nbInstrument+1)*210)+'px');
	

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
		document.cookie="instrument="+$(this).attr('instrument');
		changeInstrument($(this).attr('instrument'));	
		
		
		});
	
	//Show the name of the instrument on hover
	$('.instrumentList li').hover(function() {
		$(this).children('p').fadeIn('fast');
	}, function() {
		$(this).children('p').fadeOut('fast');
	});

	//Easter Eggs
	//konami code
	var k = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
		n = 0;
		$(document).keydown(function (e) {
	    	if (e.keyCode === k[n++]) {
	        	if (n === k.length) {
	            	addSpecial();
	            	n = 0;
	            	return false;
	        	}
	    	}
	    	else {
	        	n = 0;
	    	}
		});


	//Never gonna give you up,rick is in da place    	
	function addSpecial(){
		console.log('Never gonna give you up,rick is in da place !');
		$('.instrumentList ul li').last().fadeIn('fast');
	}


	
	// display "join room link"
	$(document).ready(function() {
		if(location.pathname=='/play'){
			generateLink(myData.room); //interface.js
		}
	});
	


});



//Fonction who send the cureent room and create the link for the current room
function generateLink(nameRoom){
	$('#urlRoom').val(location.origin+'/create?room='+nameRoom);
	$('div.twitter a').attr('data-url',$('#urlRoom').val());
	$('div.facebook').attr('data-href',$('#urlRoom').val());

}

//get cookie
function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	    }
	    return "";
	}

//Print the list of the current user in the room
function printConnectedUsers(data) {
	$('.user-in-list').remove();
	for (var i=0; i<data.length; i++) {
		$(".users-list ul").append('<li id="'+data[i][1].replace(" ", "_")+'" mute="false" class="user-in-list"><span>'+data[i][1]+'</span><div class="mute"></div></li>');
		document.getElementById(data[i][1].replace(" ", "_")).addEventListener("click",mute);
	}
}



