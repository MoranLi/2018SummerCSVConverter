function initializeButton() {
  // add event listener to each button
  // will remove in future, using zooming
  document.getElementById("Child0").addEventListener("click",function(){
    switchData(0);
  })
  document.getElementById("Child1").addEventListener("click",function(){
    switchData(1);
  })
  document.getElementById("Child2").addEventListener("click",function(){
    switchData(2);
  })
  document.getElementById("Child3").addEventListener("click",function(){
    switchData(3);
  })
  document.getElementById("Child4").addEventListener("click",function(){
    switchData(4);
  })
  document.getElementById("Child5").addEventListener("click",function(){
    switchData(5);
  })
  document.getElementById("Child6").addEventListener("click",function(){
    switchData(6);
  })
  document.getElementById("Child7").addEventListener("click",function(){
    switchData(7);
  })
  document.getElementById("Child8").addEventListener("click",function(){
    switchData(8);
  })
  document.getElementById("Child9").addEventListener("click",function(){
    switchData(9);
  })
  document.getElementById("parent").addEventListener("click",function(){
    switchData(-1);
  })
}

