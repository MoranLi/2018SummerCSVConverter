// copy of data load from data set
var data;
// current axis set
var current_data;
// max number of dimension shown in pc
var max_dimension = 10;
// total dimension of system
var dimension;
// record current level 
var level;
// final level achievable (log10(dimension))
var final_level;
// record index of parent
var parent_index = []; 
// record index of current data
var current_index;
//start revision of system
var start_point;
// end revision of system
var end_point;
// record current paris exist ()
var current_pair;
// parallel coordinate each path x axis
var pathes = [];