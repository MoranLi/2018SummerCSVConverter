function loadData(name) {
  //*******************************************************************************
  // Main Function: load json file and read datafor visualise***
  //*******************************************************************************
  d3.json('data/'+name+'.json', function(raw_data) {

    // initialize global variable
    data = Object.assign(raw_data.clone_evolution)
    start_point = raw_data.min_revision
    end_point = raw_data.max_revision
    dimension = end_point-start_point+1
    level = 0;
    final_level = Math.round(Math.log10(dimension));
    current_index = 0;
    current_pair = {};

    // modify data to fit first level
    current_data = [];
    for(var i=0;i<raw_data.clone_evolution.length;i++){
        current_data.push(recreate_data(start_point,end_point,raw_data.clone_evolution[i],max_dimension))
    }

    createParallelCoordinate(current_data);
    
    // initialize scrolling and button function
      // initializeButton();
      // initializePathAxis(pathes);
      // initializeScroll(pathes);

    var canvas = document.getElementById("example").children

    console.log(canvas)

    for(var i=0;i<canvas.length;i++){
      if(i<4){
        //canvas[i].setAttribute("height","345");
        //canvas[i].setAttribute("width","1139");
      }
      canvas[i].setAttribute("style","position: absolute");
    }

  });
}