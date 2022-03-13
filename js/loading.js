let w;
let length = 200;
let breadth = 14;
let n = 0;
function setup() {
  createCanvas(400, 400);
  w = 0;
}

function draw() {
  background('#EEE2D2');
    
  stroke(106, 115, 90);
  noFill();
  rect(width/2 - length/2, height/2 - breadth/2, length, breadth);
  
  
  noStroke();
  fill(106, 115, 90);
  rect(width/2 - length/2, height/2 - breadth/2, w++, breadth);
  
  if (w > length) {
    w = 0;
  }
}