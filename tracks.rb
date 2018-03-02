require 'victor'
require 'savage'

WIDTH = 1000
HEIGTH = 800

BORDER = 20

practice = Victor::SVG.new width: WIDTH, height: HEIGTH

# # shirt = Victor::SVG.new width: 10, height: 10

# def shirt
#   return defs do
#     pattern id: "shirt", x: "0", y: "0", width: "50", height: "50", patternUnits: "userSpaceOnUse" do
#       rect x: "0" , y: "0", width: "25", height: "50", fill: "black"
#       # rect x: "25", y: "0", width: "25", height: "50", fill: "red"
#       rect x: "25", y: "0", width: "25", height: "50", fill: "yellow"
#     end
#   end
# end

# shirt.build do
#   rect x: 4, y: 0, width: 2, height: HEIGTH, stroke: 'black', fill: 'none', :'stroke-width' => 1
# end

practice.build do
  # rect x: 0, y: 0, width: WIDTH, height: HEIGTH, stroke: 'black', fill: 'none', :'stroke-width' => 3
  # shirt
  b = Savage::Path.new do |p|
    p.move_to BORDER + 50, BORDER
    p.arc_to 50, 50, 0, true, false, BORDER + 50, BORDER + 100
  end
  path d: b.to_command, fill: 'none', :'stroke-width' => 1, stroke: 'black', :'class' => 'track corner', corner: true
  b = Savage::Path.new do |p|
    p.move_to BORDER + 50, BORDER + 100
    p.line_to BORDER + 250, BORDER + 100
  end
  path d: b.to_command, fill: 'none', :'stroke-width' => 1, stroke: 'black', :'class' => 'track straight', corner: false
  b = Savage::Path.new do |p|
    p.move_to BORDER + 250, BORDER + 100
    p.arc_to 50, 50, 0, true, false, BORDER + 250, BORDER
  end
  path d: b.to_command, fill: 'none', :'stroke-width' => 1, stroke: 'black', :'class' => 'track corner', corner: true
  b = Savage::Path.new do |p|
    p.move_to BORDER + 250, BORDER
    p.line_to BORDER + 50, BORDER
    # p.close_path
  end
  path d: b.to_command, fill: 'none', :'stroke-width' => 1, stroke: 'black', :'class' => 'track straight', corner: false


end

practice.save 'practice'
