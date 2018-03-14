var BezierEasing = require('bezier-easing');

queue()
  .defer(d3.xml, "practice.svg", "image/svg+xml")
  .await(ready);

const clamp = (v) => Math.max(0, Math.min(1, v));
const lerp = (v1, v2, t) => v1 * (1 - t) + (v2 * t);
const normalise = (t, b) => (t - b) / (1 - b)

const linear = (t) => t;
const easeInQuad = (t) => t * t;
const easeOut = (p) => (t) => 1 - Math.abs(Math.pow(t - 1, p));
const eastOutQuad = easeOut(2)
const eastOutCubic = easeOut(3)
const eastOutQuart = easeOut(4)
const eastOutQuint = easeOut(5)

const p = (t) => t * 10;
const v = (t) => t / 10;

const straightEase = (t) => 0.2 * Math.sin(t * Math.PI) + t;
const cornerEase = (t) => 0.2 * Math.sin((t - 1) * Math.PI) + t;
const Easings = {
  // linear: linear,
  corner: BezierEasing(1.0, 0.6, 0.95, 0.9),
  straight: BezierEasing(0.5, 1.0, 0.75, 0.85),
  cornerStart: BezierEasing(1.0, 0.6, 0.95, 0.9),
  cornerMiddle: BezierEasing(1.0, 0.6, 0.95, 0.9),
  straightStart: BezierEasing(1.0, 0.6, 0.95, 0.9),
  straightMiddle: BezierEasing(1.0, 0.6, 0.95, 0.9)
}

const SupportedEasings = Object.keys(Easings);
const easyLikeSundayMorning = (func) => (t) => Math.max(t, clamp(Easings[func](t)));

const pathStartPoint = (path) => path.attr("d").split(/[\sA]+/)[1].split(",")
const translateAlong = (path) => {
  const l = path.getTotalLength();

  return (i) => (t) => {
    const p = path.getPointAtLength((isNaN(t) ? 1 : t) * l);

    return `translate(${p.x},${p.y})`;
  }
}

function transition(marker, speed, paths, i) {
  const thisPath = i >= paths.length ? 0 : i;
  const path = paths[thisPath]

  const time = path.getTotalLength() * speed;

  const classes = path.getAttribute('class').split(' ');
  const easings = classes.filter((classname) => SupportedEasings.includes(classname));
  const easing = easings.length === 0 ? 'linear' : easings[0];
  // if()

  // console.log(easing);
  marker.transition()
      .duration(time)
      .ease(Easings[easing])
      .attrTween("transform", translateAlong(path))
      .each("end", () => transition(marker, speed, paths, thisPath + 1));
}

function ready(error, xml) {
  const importedNode = document.importNode(xml.documentElement, true);
  d3.select("#pathAnimation").node().appendChild(importedNode);

  const svg = d3.select("svg");
  const tracks = svg.selectAll("path.track");
  const track = svg.select("path.track");
  const startPoint = pathStartPoint(tracks);

  const marker1 = svg.append("circle");
  marker1.attr("r", 5).attr("transform", `translate(${startPoint})`)

  // const marker2 = svg.append("rect");
  // marker2.attr("width", 5).attr("height", 5).attr("transform", `translate(${startPoint})`)

  transition(marker1, 10, tracks[0], 0);
  // transition(marker2, 5.25, tracks[0], 1);
}
