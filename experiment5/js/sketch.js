// sketch.js - The purpose of this sketch is to create a 3D space where the shapes will change color based on their position.
// This site was used for reference for the 3D base. https://editor.p5js.org/p5/sketches/3D:_orbit_control
// This site was used for inspiration for the shapes changing color off of the position. https://editor.p5js.org/generative-design/sketches/P_1_1_2_01
// I used ChatGPT to help me code this.
// Author: William Gonzalez
// Date: 2/10/25

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Globals
let cam;

// setup() function is called once when the program starts
function setup() {
  createCanvas(710, 400, WEBGL);
  cam = createCamera();
  cam.setPosition(0, 0, 0);
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(0); // Black background
  let radius = width * 1.5;

  //drag to move the world.
  orbitControl();

  for (let i = 0; i <= 12; i++) {
    for (let j = 0; j <= 12; j++) {
      push();
      let a = (j / 12) * PI;
      let b = (i / 12) * PI;
      translate(
        sin(2 * a) * radius * sin(b),
        (cos(b) * radius) / 2,
        cos(2 * a) * radius * sin(b)
      );
      
      if (j % 2 === 0) {
        fill(0, 0, 255); // Blue color for cones
        cone(30, 30);
      } else {
        fill(128, 0, 128); // Purple color for boxes
        box(30, 30, 30);
      }
      pop();
    }
  }
}