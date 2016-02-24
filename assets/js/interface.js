
$(document).ready(function(){ 
	document.cookie="instrument=bass";
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

	$('.instrumentList li').hover(function() {
		$(this).children('p').fadeIn('fast');
	}, function() {
		$(this).children('p').fadeOut('fast');
	});


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

	// send message with Enter
	$(document).keyup(function(event){
		if((event.keyCode==13) && ($('#inputText').val()) && ($(".inputMsg").is(":focus")) ){
			emit(); // client.js function
		}
	});

	// display "join room link"
	$(document).ready(function() {
		if(location.pathname=='/play'){
			generateLink(myData.room); //interface.js
		}
	});
	
});

//Chat functio
var currentStateOpened = false;

function addNewMsgNotification() {
	if( !currentStateOpened ){
		$(".chatHeader").addClass("newMsgNotification");
	}
}

function eraseNewMsgNotification() {
	$(".chatHeader").removeClass("newMsgNotification");
}

//Function who send message
function sendMsg(message, user){
	$('.msg').append('<p><span id="user">'+user+'</span> : '+message+'</p>');
	$('.inputMsg').val('');
	$('.msg').animate({ scrollTop: 1000000 }, "slow");

}

//Fonction who send the cureent room and create the link for the current room
function generateLink(nameRoom){
	$('#urlRoom').val(location.origin+'/create?room='+nameRoom);
}

