function recreate_data(start,end,chain,max_dimension){
  // returned data
  var newData = {};
  // j is the pointer loop through revisiob, assume the system start from revision 0
  var j = 0;
  // total dimension will been shown in the parallel coordination
  var temp_dimension;
  // if currently, the dimension between start and end is more than max dimension allowed
  if(max_dimension < end-start){
      temp_dimension = max_dimension
  }
  else{
      temp_dimension = end-start
  }
  // loop through each dimension range
  // i is the nth dimension range been calculate
  for(var i=0;i<=temp_dimension;i++){
      var index;
      // avoid situation divided by 0(start from revision 0) 
      if( i == 0 ){
          index = start;
      }
      else {
          // calculate index by range*i/10+start
          index = Math.round((end-start)/temp_dimension*i+start);
      }
      var sum = 0;
      var num = 0;
      // calculate average of change count
      for(;j<index;j++){
          var changecount = chain[j];
          if (changecount>-1){
              sum+=changecount;
              num++;
          }
      }
      // if the clone chain do not exist in the given range
      if(num == 0){
          newData[index] = NaN;
      }
      // else set avarage of changecount
      else{
          newData[index] = Math.round(sum/num);
      }
      // set j to index, start of next loop
      j = index;
  }
  // copy other field from original data
  newData["Name"] = chain["Name"];
  newData["StartRevision"] = chain ["StartRevision"];
  newData["EndRevision"] = chain["EndRevision"];
  return newData;
}