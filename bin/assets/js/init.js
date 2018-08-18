/* var container = document.getElementById('inner'),
template = document.createElement('div'),
squares = [];
var partLen = 32 * 32;
var gama = 8;
var angleX = 45, angleY = 0, angleZ = 0;
template.className = 'bar';
var shadow = 20;
navigator.getUserMedia = navigator.getUserMedia       ||
                         navigator.webkitGetUserMedia ||
                         navigator.mazGetUserMedia;

//if(confirm("this is done using CSS3 & is extensive on cpu.. do you wanna continue")){
window.requestAnimFrame = (function(){
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||
         function(callback){
           window.setTimeout(callback, 1000 / 60);
         };
})();


for(var i=0; i<32; i++){
  squares[i] = [];
  for(var j=0; j<32; j++){
    squares[i].push(container.appendChild(template.cloneNode()));
  }
}

function Render(){
  if(!processor){
    requestAnimFrame(Render);
    return;
  }

  processor.getByteFrequencyData(dataArray);
  //console.log(dataArray);
  angleZ += dataArray[32] * 0.00002;
  angleY += dataArray[16] * 0.0000002;
  angleX += dataArray[8] * 0.00000002;
  var avgSpectrum = dataArray;

  var current = [],
      last = [],
      currentEle, lastEle;

  for (var i=0; i<31; i++){
    current =  squares[i];
    last = squares [i+1];
    for(var j=0; j<32; j++){
      currentEle = current[j];
      lastEle = last[j].style;

      currentEle.style.backgroundColor = lastEle.backgroundColor;
      currentEle.style.boxShadow = lastEle.boxShadow;
      currentEle.style.webkitTransform = lastEle.webkitTransform;
    }
  }

  current = squares[31];

  var r, g, b, sample_bef, sample, color;

  for(var i=0; i<32; i++){
    currentEle = current[i];
    sample = avgSpectrum[i];
    sample_bef = avgSpectrum[i-1]?((avgSpectrum[i-1])):0;
    sample = (sample + sample_bef/2)/5;

    if(sample<50){
      r = sample *gamma;
    }
    else{
      r = (100 - sample) * gamma;
    }

    if(sample >= 30 && sample < 80){
      g = (sample - 30) * gamma;
    }
    else if(sample<30){
      g = (sample - 30) * gamma;
    }
    else{
      g = (130 - sample) * gamma;
    }

    if(sample >= 50){
      b = (sample - 50) * gamma;
    }
    else{
      b = (50 - sample) * gamma;
    }

    r = ~~r;
    g= ~~g;
    b= ~~b;

    color = 'rgb('+r+','+g+','+b+')';
    currentEle.style.backgroundColor = color;
    currentEle.style.boxShadow = '0px 0px '+ (r+g+b)%shadow +'px '+color;
    currentEle.style.webkitTransform = 'translateZ('+sample+'px)';
  }
  container.style.webkitTransform = 'rotateX('+angleX+'rad) rotateY('+angleY+'rad) rotateZ('+angleZ+'rad)';
    requestAnimFrame(Render);
}

requestAnimFrame(Render);


var context = new AudioContext(),
    currentvalue = new Array();
    processor = null,
    dataArray = null;


window.addEventLisener('load', function(){
  audio = new Audio();
  var params = { audio: true, video: false};
  if(navigator.getUserMedia) {
    navigator.getUserMedia( params, requestMicrophoneSuccess, requestMicrophoneError);
  }

  function requestMicrophoneError(){
    document.getElementByTagName('h1')[0] = 'Your browser is unworthy is Assimilation';
  }

  function requestMicrophoneSuccess(stream){
    audio.src = window.URL.createObjectURL(stream);
    audio.addEventLisener('canplaythrough', function(){
      console.log('And we gonna play now');
      var node = context.createMediaStreamSource(stream);
      processor = context.createAnalyser();
      processor.fftSize = 128;
      var size = processor.frequencyBinCount;
      dataArray = new Uint8Array(size);

      node.connect(processor);
      processor.connect(context.destination);
    });
  }

  audio.autoplay = true;
  audio.muted = true;

  var highPerf = document.createElement('input');
  highPerf.type = 'chaeckbox';
  highPerf.checked = true;
  var p = document.createElement('p');
  p.textContent = 'High Video Mode :' ;
  appendChild(highPerf);
  highPerf.addEventLisener('change', function(e){
    if(this.checked){
      shadow = 20;
    }
    else{
      shadow = 1;
    }
  });
  controls.appendChild(audio);
  controls.appendChild(p);
});
*/
