queue()
.defer(d3.xml, "practice.svg", "image/svg+xml")
.await(ready);

function ready(error, xml) {

  //Adding our svg file to HTML document
  var importedNode = document.importNode(xml.documentElement, true);
  d3.select("#pathAnimation").node().appendChild(importedNode);

  var svg = d3.select("svg");
  var tracks = svg.selectAll("path.track");
  var track = svg.select("path.track");
  console.log(tracks);
  console.log(track);
  console.log(track.attr("d"));
  var startPoint = pathStartPoint(tracks);
  // var path = svg.select("path#wiggle"),
  // startPoint = pathStartPoint(path);


  var marker = svg.append("circle");
  marker.attr("r", 7)
    .attr("transform", "translate(" + startPoint + ")");

  transition(tracks[0], 0);

  //Get path start point for placing marker
  function pathStartPoint(path) {
    console.log(path);
    var d = path.attr("d"),
    dsplitted = d.split(/[\sA]+/);
    return dsplitted[1].split(",");
  }

  function transition(paths, i) {
    if(i >= paths.length) {
      i = 0;
    }
    // console.log(paths);
    var classes = paths[i].getAttribute('class').split(' ');
    console.log(paths[i].getTotalLength());
    // debugger;
    var mul = 20;
    // var easing = 'linear';
    var easing = d3.easePolyOut.exponent(1.2);
    if(classes.includes('corner')) {
    //   mul = 20;
      easing = d3.easePolyIn.exponent(1.4);
    }
    var time = paths[i].getTotalLength() * mul;
    // console.print(time);
    marker.transition()
        .duration(time)
        .ease(easing)
        .attrTween("transform", translateAlong(paths[i]))
        .each("end", function() { return transition(paths, i + 1) });// infinite loop
  }
  

  // NEED CUSTOM EASING FUNCTION

  
  function translateAlong(path) {
    var l = path.getTotalLength();
    return function(i) {
      return function(t) {
        if(isNaN(t)) {
          t = 1;
        }
        // t = Math.min(t, 0.8);
        // t = Math.max(t, 0.2);
        var p = path.getPointAtLength(t * l);
        // console.log(t);
        // console.log(l);
        return "translate(" + p.x + "," + p.y + ")";//Move marker
      }
    }
  }
}
