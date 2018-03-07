queue()
  .defer(d3.xml, "practice.svg", "image/svg+xml")
  .await(ready);

const clamp = (v) => Math.max(0, Math.min(1, v));
const lerp = (v1, v2, t) => v1 * (1 - t) + (v2 * t);
const normalise = (t, b) => (t - b) / (1 - b)

const linear = (t) => t;

const easeInQuad = (t) => t * t;
const easeOutQuad = (t) => t * (2 - t);

const eastOutCubic = (t) => (--t) * t * t + 1;

const p = (t) => t * 10;
const v = (t) => t / 10;

const Easings = {
  linear: linear,
  corner: linear,
  straight: (t) => lerp(linear(t), eastOutCubic(t), t),
}
const SupportedEasings = Object.keys(Easings);

const easyLikeSundayMorning = (func) => (t) => Math.max(t, clamp(Easings[func](t)));


function ready(error, xml) {

  //Adding our svg file to HTML document
  const importedNode = document.importNode(xml.documentElement, true);
  d3.select("#pathAnimation").node().appendChild(importedNode);

  const svg = d3.select("svg");
  const tracks = svg.selectAll("path.track");
  const track = svg.select("path.track");
  console.log(tracks);
  console.log(track);
  console.log(track.attr("d"));
  const startPoint = pathStartPoint(tracks);

  const marker = svg.append("circle");
  marker.attr("r", 7)
    .attr("transform", "translate(" + startPoint + ")");

  transition(tracks[0], 0);

  //Get path start point for placing marker
  function pathStartPoint(path) {
    const d = path.attr("d"),
    dsplitted = d.split(/[\sA]+/);
    return dsplitted[1].split(",");
  }

  function transition(paths, i) {
    if (i >= paths.length) {
      i = 0;
    }

    const speed = 20;
    const time = paths[i].getTotalLength() * speed;

    const classes = paths[i].getAttribute('class').split(' ');
    const easings = classes.filter((classname) => SupportedEasings.includes(classname));
    const easing = easings.length === 0 ? 'linear' : easings[0];

    marker.transition()
        .duration(time)
        .ease(easyLikeSundayMorning(easing))
        .attrTween("transform", translateAlong(paths[i]))
        .each("end", function() { return transition(paths, i + 1) });// infinite loop
  }


// NEED CUSTOM EASING FUNCTION


  function translateAlong(path) {
    const l = path.getTotalLength();
    return function(i) {
      return function(t) {
        if(isNaN(t)) {
          t = 1;
        }

        const p = path.getPointAtLength(t * l);

        return "translate(" + p.x + "," + p.y + ")";//Move marker
      }
    }
  }
}
