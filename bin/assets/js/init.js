var tracklist = document.querySelectorAll('.track');

document.addEventListener('keypress', function(key){
  if(key.keyCode == 32){
  }
});

function playpause(){
  tracklist[i].addEventListener('click', function(e){

  });
}

for(i=0; i < trackList.length; i++){
  playpause();
}

function findIndex(el){
  var i=1;
  while(el.previousSibling){
    el = el.previousSibling;
    if(el.nodeType === 1){
      i++;
    }
  }
  return i;
}
