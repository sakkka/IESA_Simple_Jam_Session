$(document).ready(function() {


  //Init Buffer
  var context = init();
  var electro;
  var arrayBuffer = initBuffer(context);
  var frameCount = context.sampleRate * 2.0;

var request = new XMLHttpRequest();

request.open( 'GET', '', true );
request.responseType = 'arraybuffer';
console.log(request.response);
request.onload = function() {
   	context.decodeAudioData(request.response, function(buffer){
	electro = buffer;
});
   }

  /*for (var i = 0; i < frameCount; i++) {
     // Math.random() is in [0; 1.0]
     // audio needs to be in [-1.0; 1.0]
     nowBuffering[i] = 1;
   }*/
  var source = context.createBufferSource();
  // set the buffer in the AudioBufferSourceNode
  source.buffer = electro;
  // connect the AudioBufferSourceNode to the
  // destination so we can hear the sound
  source.connect(context.destination);
  // start the source playing
  source.start(0);

 
});


function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
    return context;    
  }
  catch(e) {
    console.log('Web Audio API is not supported in this browser');
  }

}

function initBuffer(context){
	var buffer = context.createBuffer(1, 22050, 44100);
    return buffer;
}

