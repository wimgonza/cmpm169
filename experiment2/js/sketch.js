// sketch.js - The purpose of this sketch is to create a kaleidoscope that changes its color as it is drawn. The color values are determined off of a quadratic equation.
// This site was used for reference for the kaleidoscope base. https://editor.p5js.org/p5/sketches/Interaction:_kaleidoscope
// This site was used for inspiration for the color changing with position. https://editor.p5js.org/generative-design/sketches/P_1_1_2_01
// Author: William Gonzalez
// Date: 1/20/25

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Globals
// Symmetry corresponding to the number of reflections. Change the number for different number of reflections 
let symmetry = 10;
let angle = 360 / symmetry;
let clearButton, mouseButton, keyboardButton;
let slider;

// setup() function is called once when the program starts
function setup() {
  // Creating the canvas and making it gray
  createCanvas(710, 710);
  angleMode(DEGREES);
  background(127);

  // Creating the clear screen button
  clearButton = createButton('clear');
  clearButton.mousePressed(clearScreen);

  // Creating the button for Full Screen
  fullscreenButton = createButton('Full Screen');
  fullscreenButton.mousePressed(screenFull);

  // Setting up the slider for the thickness of the brush
  brushSizeSlider = createButton('Brush Size Slider');
  sizeSlider = createSlider(1, 32, 4, 0.1);
}

// Clears the screen by setting it back to gray
function clearScreen() {
  background(127);
}

// Full Screen Function
function screenFull() {
  let fs = fullscreen();
  fullscreen(!fs);
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  // Setting up the kaleidoscope drawing portion
  translate(width / 2, height / 2);
  stroke1 = ((mouseX * mouseX) + mouseX) / 710;
  stroke2 = ((mouseY * mouseY) + mouseY) / 710;
  stroke3 = ((mouseX * mouseY) + ((mouseX + mouseY) / 2)) / 710;

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;
    
    if (mouseIsPressed) {
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        let sw = sizeSlider.value();
        stroke(stroke1, stroke2, stroke3);
        strokeWeight(sw);
        line(mx, my, pmx, pmy);
        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
    }
  }
  
}