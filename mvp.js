



queue()
  .defer(d3.xml, "melbourne.svg", "image/svg+xml")
  .await(ready);

const pathStartPoint = (path) => path.attr("d").split(/[\sA]+/)[1].split(",")

function ready(error, xml) {
  const importedNode = document.importNode(xml.documentElement, true);
  d3.select("#track").node().appendChild(importedNode);

  const svg = d3.select("svg");
  const paths = svg.selectAll("path");
  // const track = svg.select("path.track");
  // const startPoint = pathStartPoint(paths);
  const startPoint = "564.06244,320.81135"
  const marker1 = svg.append("circle");
  marker1.attr("r", 5).attr("transform", `translate(${startPoint})`)
}

