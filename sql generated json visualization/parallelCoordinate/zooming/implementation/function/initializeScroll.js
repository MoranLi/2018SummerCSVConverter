function initializePathAxis(pathes){
  // calculate a axis for each dimension
  // base on x axis of each path
  Array.prototype.forEach.call(document.getElementsByTagName("path"),function(path){
    var x = (path.getBoundingClientRect().left + path.getBoundingClientRect().right) / 2
    pathes.push(x);
  })
}

function initializeScroll(pathes) {   
  // Firefox and other browser use different way to control mouse scroll           
  if(navigator.userAgent.indexOf("Firefox") > -1){
    // if is Firefox
    document.getElementById("example").addEventListener("DOMMouseScroll", function(event) {
      // -3 means scroll in
      if(event.detail == -3){
        // loop through axis of each dimension
        pathes.forEach(function(xs,i){
          // larger means it should zoom in to dimension before
          if(event.x < xs){
            switchData(i-1);
          }
        })
      }
      else{
        switchData(-1);
      }
    });
  }
  else {
    document.getElementById("example").onmousewheel = function (event) {
      event = event || window.event;
      if(event.wheelDelta > 0){
        pathes.forEach(function(xs,i){
          if(event.x < xs){
              switchData(i-1);
          }
        })
      }
      else{
        switchData(-1);
      }
    }
  }
}