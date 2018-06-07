function initializeSlider(total_file){
    var slider_function = function (slider){
      document.getElementsByTagName("g")[23].innerHTML= "";
      // value of slider
      var value = slider.value();
      d3.json("data3.json",function(error,data){
        if(error)
          console.log(error);
        // specific number of file been displayed for each type
        var type1FileNum = Math.round(value * data.children[0].children.length / total_file);
        var type2FileNum = Math.round(value * data.children[1].children.length / total_file);
        var type3FileNum = Math.round(value * data.children[2].children.length / total_file);
        // slice first n element to keep original proportion
        data.children[0].children = data.children[0].children.slice(0,type1FileNum);
        data.children[1].children = data.children[1].children.slice(0,type2FileNum);
        data.children[2].children = data.children[2].children.slice(0,type3FileNum);
        // reset path and text base on new data
        //console.log(data)
        var new_nodes = partition.nodes(data)
        // transition
        var path = svg
          .selectAll("path")
          .data(new_nodes.slice(1))
          .enter()
          .append("path")
          .attr("d", arc)
          .style("stroke", "#fff")
          .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
          .each(function(d) {
            this._current = {
              data: d.data,
              value: d.value,
              startAngle: enterClockwise.startAngle,
              endAngle: enterClockwise.endAngle
            }
          })
          .on("mouseover",function(d){
            d3.select(this)
              .style("fill","yellow");
          })
          .on("mouseout",function(d){
            d3.select(this)
              .transition()
              .duration(200)
              .style("fill", function(d) { 
                return color((d.children ? d : d.parent).name); 
              });
          });
        path.append("title")
          .text(function(d){return d.name});	
      });
    }
    // initialize slider
    var num_ele = []
    for( var i = 3;i<=total_file+1;i++){
      num_ele.push(i)
    }
    var slider = d3.slider().min(3).max(total_file+1)
                  .tickValues(num_ele).stepValues(num_ele).callback(slider_function);
    d3.select("#slider").call(slider);
  
  }