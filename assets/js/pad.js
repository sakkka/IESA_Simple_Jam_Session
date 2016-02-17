$(document).ready(function(){

	//KeyDown Event

	$(document).keydown(function(event){	
		if(!($(".inputMsg").is(":focus"))){	
			switch(event.keyCode){
				case 65:
					keyPress('a');
					break;
				case 90:
					keyPress('z');
					break;	
				case 69:
					keyPress('e');
					break;
				case 82:
					keyPress('r');
					break;
				case 84:
					keyPress('t');
					break;	
				case 89:
					keyPress('y');
					break;	
				case 85:
					keyPress('u');
					break;	
				case 73:
					keyPress('i');
					break;	
				case 79:
					keyPress('o');
					break;	
				case 80:
					keyPress('p');
					break;
				case 81:
					keyPress('q');
					break;		
				case 83:
					keyPress('s');
					break;		
				case 68:
					keyPress('d');
					break;		
				case 70:
					keyPress('f');
					break;		
				case 71:
					keyPress('g');
					break;		
				case 72:
					keyPress('h');
					break;		
				case 74:
					keyPress('j');
					break;	
				case 75:
					keyPress('k');
					break;		
				case 76:
					keyPress('l');
					break;		
				case 77:
					keyPress('m');
					break;
				case 87:
					keyPress('w');
					break;	
				case 88:
					keyPress('x');
					break;	
				case 67:
					keyPress('c');
					break;	
				case 86:
					keyPress('v');
					break;	
				case 66:
					keyPress('b');
					break;	
				case 78:
					keyPress('n');
					break;
				case 188:
					keyPress('spe1');
					break;	
				case 190:
					keyPress('spe2');
					break;	
				case 191:
					keyPress('spe3');
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
			case 190:
				keyRelease('spe2');
				break;	
			case 191:
				keyRelease('spe3');
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
	
})