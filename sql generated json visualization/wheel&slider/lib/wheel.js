function addWheel(name){
    // initialzie visualization
    var width = 800,
        height = 800,
        radius =  Math.min(width, height) / 2 ,
        color = d3.scale.category20(),
        path,
        text,
        total_file = 0;
  
    var svg = d3.select(name).append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + radius + "," + radius + ")");
  
    var partition = d3.layout.partition()
            .sort(null)
            .size([2 * Math.PI, radius * radius])
            .value(function(d) { return 1; });
  
    var arc = d3.svg.arc()
          .startAngle(function(d) { return d.x; })
          .endAngle(function(d) { return d.x + d.dx; })
          .innerRadius(function(d) { return Math.sqrt(d.y); })
          .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); }
    );
  
    var enterClockwise = {
      startAngle: 0,
      endAngle: 0
    };
  
    var enterAntiClockwise = {
      startAngle: Math.PI * 2,
      endAngle: Math.PI * 2
    };
  
    // load data file
    d3.json("data/data3.json", function(error, data) {
      if(error)
        console.log(error);
      var data = data;
      console.log(data)
      var slider_function = function (slider){
        document.getElementsByTagName("g")[23].innerHTML= "";
        // value of slider
        var value = slider.value();
        d3.json("data/data3.json",function(error,data){
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
  
      // sorting files in type1/type2/type3 clone by number of clone chain
      data.children[0].children.sort(function(a, b) {
        return b.children.length-a.children.length;
      })
      data.children[1].children.sort(function(a, b) {
        return b.children.length-a.children.length;
      })
      data.children[2].children.sort(function(a, b) {
        return b.children.length-a.children.length;
      })
      // total number of files from sources
      total_file = data.children[0].children.length+data.children[1].children.length+data.children[2].children.length;
      // initialize slider
      var num_ele = []
      for( var i = 3;i<=total_file+1;i++){
        num_ele.push(i)
      }
      var slider = d3.slider().min(3).max(total_file+1)
                    .tickValues(num_ele).stepValues(num_ele).callback(slider_function);
      d3.select("#slider").call(slider);
      // initialize slider		
      partition
        .value(function(d) { return 1; })
        .nodes(data);
      // partition.children(function(d, depth) { return depth < 3 ? d.children : null; })
      // initialize path and text
      var nodes = partition.nodes(data);
      path = svg
        .selectAll("path")
        .data(nodes.slice(1))
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
    // slider function
    function arcTween(b) {
      var i = d3.interpolate(this._current, b);
      this._current = i(0);
      return function(t) {
          return arc(i(t));
      };
    }
    function arcTweenOut(a) {
      var i = d3.interpolate(this._current, {startAngle: Math.PI * 2, endAngle: Math.PI * 2, value: 0});
      this._current = i(0);
      return function (t) {
        return arc(i(t));
      };
    }
    function updateArc(d) {
      return {depth: d.depth, x: d.x, dx: d.dx};
    }
  }