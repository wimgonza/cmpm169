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
let rotationSpeed = 0.01;

// setup() function is called once when the program starts
function setup() {
  createCanvas(710, 400, WEBGL);
  cam = createCamera();
  cam.setPosition(0, 0, 0);
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(0);
  let radius = width * 1.5;

  // Drag to move the world.
  orbitControl();
  
  rotateY(frameCount * rotationSpeed); 

  for (let i = 0; i <= 12; i++) {
    for (let j = 0; j <= 12; j++) {
      push();
      let a = (j / 12) * PI;
      let b = (i / 12) * PI;
      let x = sin(2 * a) * radius * sin(b);
      let y = (cos(b) * radius) / 2;
      let z = cos(2 * a) * radius * sin(b);

      translate(x, y, z);
      
      rotateX(frameCount * rotationSpeed);
      rotateY(frameCount * rotationSpeed);
      rotateZ(frameCount * rotationSpeed);
      
      let red = map(x, -radius, radius, 0, 255);
      let green = map(y, -radius / 2, radius / 2, 0, 255);
      let blue = map(z, -radius, radius, 0, 255);
      
      let colorRed = map(sin(frameCount * 0.01 + x), -1, 1, 0, 255);
      let colorGreen = map(cos(frameCount * 0.01 + y), -1, 1, 0, 255);
      let colorBlue = map(sin(frameCount * 0.01 + z), -1, 1, 0, 255);
      
      if (j % 2 === 0) {
        fill(colorRed, colorGreen, colorBlue);
        cone(30, 30);
      } else {
        fill(255 - colorRed, 255 - colorGreen, 255 - colorBlue);
        box(30, 30, 30);
      }
      pop();
    }
  }
}