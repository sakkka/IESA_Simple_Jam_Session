var arrayInstrument  = {};

$(document).ready(function(){
	//KeyDown Event
	ready = false;
	$(document).keydown(function(event){	
		if((!($(".inputMsg").is(":focus")))||(!ready)){	
			switch(event.keyCode){
				case 65:
					keyPress('a');
					playLocalSound('1');
					break;
				case 90:
					keyPress('z');
					playLocalSound('2');
					break;	
				case 69:
					keyPress('e');
					playLocalSound('3');
					break;
				case 82:
					keyPress('r');
					playLocalSound('4');
					break;
				case 84:
					keyPress('t');
					playLocalSound('5');
					break;	
				case 89:
					keyPress('y');
					playLocalSound('6');
					break;	
				case 85:
					keyPress('u');
					playLocalSound('7');
					break;	
				case 73:
					keyPress('i');
					playLocalSound('8');
					break;	
				case 79:
					keyPress('o');
					playLocalSound('9');
					break;	
				case 80:
					keyPress('p');
					playLocalSound('10');
					break;
				case 81:
					keyPress('q');
					playLocalSound('11');
					break;		
				case 83:
					keyPress('s');
					playLocalSound('12');
					break;		
				case 68:
					keyPress('d');
					playLocalSound('13');
					break;		
				case 70:
					keyPress('f');
					playLocalSound('14');
					break;		
				case 71:
					keyPress('g');
					playLocalSound('15');
					break;		
				case 72:
					keyPress('h');
					playLocalSound('16');
					break;		
				case 74:
					keyPress('j');
					playLocalSound('17')
					break;	
				case 75:
					keyPress('k');
					playLocalSound('18')
					break;		
				case 76:
					keyPress('l');
					playLocalSound('19')
					break;		
				case 77:
					keyPress('m');
					playLocalSound('20')
					break;
				case 87:
					keyPress('w');
					playLocalSound('21')
					break;	
				case 88:
					keyPress('x');
					playLocalSound('22')
					break;	
				case 67:
					keyPress('c');
					playLocalSound('23')
					break;	
				case 86:
					keyPress('v');
					playLocalSound('24')
					break;	
				case 66:
					keyPress('b');
					playLocalSound('25')
					break;	
				case 78:
					keyPress('n');
					playLocalSound('26')
					break;
				case 188:
					keyPress('spe1');
					playLocalSound('27')
					break;									
				default:					
					//do Nothing
			}	
		}		

	});

	//KeyUp Event
	$(document).keyup(function(event){
		switch(event.keyCode){
			case 65:
				keyRelease('a');
				break;
			case 90:
				keyRelease('z');
				break;	
			case 69:
				keyRelease('e');
				break;
			case 82:
				keyRelease('r');
				break;
			case 84:
				keyRelease('t');
				break;
			case 89:
				keyRelease('y');
				break;
			case 85:
				keyRelease('u');
				break;
			case 73:
				keyRelease('i');
				break;
			case 79:
				keyRelease('o');
				break;
			case 80:
				keyRelease('p');
				break;
			case 81:
				keyRelease('q');
				break;		
			case 83:
				keyRelease('s');
				break;		
			case 68:
				keyRelease('d');
				break;		
			case 70:
				keyRelease('f');
				break;		
			case 71:
				keyRelease('g');
				break;		
			case 72:
				keyRelease('h');
				break;		
			case 74:
				keyRelease('j');
				break;	
			case 75:
				keyRelease('k');
				break;		
			case 76:
				keyRelease('l');
				break;		
			case 77:
				keyRelease('m');
				break;
			case 87:
				keyRelease('w');
				break;	
			case 88:
				keyRelease('x');
				break;	
			case 67:
				keyRelease('c');
				break;	
			case 86:
				keyRelease('v');
				break;	
			case 66:
				keyRelease('b');
				break;	
			case 78:
				keyRelease('n');
				break;
			case 188:
				keyRelease('spe1');
				break;																
			default:
				//do Nothing
		}					

	});

	function keyPress(nomTouche){
		$('#'+nomTouche).css('opacity','0.6').css('transform','scale(0.9)');
	}

	function keyRelease(nomTouche){
		$('#'+nomTouche).css('opacity','1').css('transform','scale(1)');;
	}
	// init sound player
	

     //Function who will play local sound 	
	function playLocalSound(numSound){		
		var currentInstrument = getCookie('instrument');
		
		var soundPlayer = document.createElement("AUDIO");
      	soundPlayer.load();		
		soundPlayer.src = arrayInstrument[currentInstrument][numSound];
		soundPlayer.load();
		soundPlayer.play();
		soundPlayer.remove();	
		emitSound(currentInstrument,numSound);
	}


	



	//Function who return cookie
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

	//Load instrument
	
	

	$.html5Loader({
      filesToLoad:    'instrument.json', // this could be a JSON or simply a javascript object
      onBeforeLoad:       function () {
      	console.log('start');
      },
      onComplete:         function () {
      	ready = true;
      	$('.loader').fadeOut(100);
      	$('.pad').fadeIn('fast');
      	console.log('end');    
      	console.log(arrayInstrument); 	

      },
      onElementLoaded:    function ( obj, elm) { 
      	var sourceSound = obj.source;
      	var instrumentname = obj.instrument;
      	if (typeof arrayInstrument[instrumentname] == 'undefined') {
  		arrayInstrument[instrumentname] = {}
		}      	
		var number =  sourceSound.match(instrumentname+"(.*).wav");
      	arrayInstrument[instrumentname][number[1]]  = obj.source;     	


      },
      onUpdate:           function ( percentage ) {
      	$('.loading').width(percentage+'%');     	
      	
      }
});

	//Emit sound
	//Function who will play recieve sound 	
	

	
});


function playSendSound(nameInstrument,keyCode){				
		var soundSendPlayer = document.createElement("AUDIO");
      	soundSendPlayer.load();		
		soundSendPlayer.src = arrayInstrument[nameInstrument][keyCode];
		soundSendPlayer.load();
		soundSendPlayer.play();
		soundSendPlayer.remove();			
	}