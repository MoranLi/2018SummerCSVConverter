function switchData(where){
  // should not zoom out at root level
  if(level == 0 && where == -1){
      return;
  }
  // should not zoom in if reach leaf level
  if(level == final_level && where != -1){
      return;
  }
  // clear current display
  var myNode = document.getElementById("example");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  // clone data form source file
  new_data = Object.assign(data)
  // start and end index of zooming 
  var start_index,
      end_index;
  // case zoom out
  if(where == -1){
    // go back one level
    level--;
    // pop index of parent
    var parent = parent_index.pop();
    // reset current index
    current_index = parent;
    // calculate start / end index of its parent
    start_index = Math.round((dimension/Math.pow(10,level))*(parent)+start_point);
    end_index = Math.round((dimension/Math.pow(10,level))*(parent+1)+start_point);
    // if end_index is > total dimension 
    if(end_index> dimension){
      end_index = dimension;
    }
  }
  else{
    // push current index to parent_index array, store for future zoom out
    parent_index.push(current_index);
    // set current index to index of where scroll in (button in)
    current_index = where;
    level++;
    // get start / end popint from data form last time
    start_index = parseInt(Object.keys(current_data[0])[where]);
    end_index = parseInt(Object.keys(current_data[0])[where+1]);
  }
  var mod_data = [];
  for(var i=0;i<new_data.length;i++){
    mod_data.push(recreate_data(start_index,end_index,new_data[i],max_dimension))
  }
  current_data = mod_data
  createParallelCoordinate(mod_data);
}