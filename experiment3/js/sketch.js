// sketch.js - The purpose of this sketch is to create a canvas that has randomly falling snow, but when the left mouse button is pressed, the snowflakes will rotate around the cursor.
// This site was used for reference for the falling snowflakes base. https://editor.p5js.org/p5/sketches/Simulate:_SnowflakeParticleSystem
// This site was used for inspiration for the snowflakes changing position. https://editor.p5js.org/p5/sketches/Simulate:_SmokeParticleSystem
// I used ChatGPT to help me code this.
// Author: William Gonzalez
// Date: 1/27/25

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Globals
let snowflakes = []; // array to hold snowflake objects

function setup() {
  createCanvas(400, 600);
  fill(240);
  noStroke();
}

function draw() {
  background('blue');
  let t = frameCount / 60; // update time

  // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  // add a shake factor to control horizontal movement during shaking
  this.shakeFactor = 0;
  this.shakeOffset = 0;  // This will store the offset caused by shaking

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // Apply shake effect when mouse is pressed
    if (mouseIsPressed) {
      // horizontal shake based on mouse position relative to canvas center
      let mouseDistance = map(mouseX, 0, width, -10, 10);  // Increased range for more aggressive effect
      this.shakeFactor = mouseDistance * 1.5;  // Amplified shake factor
    } else {
      // When mouse is not pressed, keep the shakeOffset to retain the altered trajectory
      this.shakeFactor = this.shakeOffset;
    }

    // Apply shaking factor to x position
    this.posX += this.shakeFactor;

    // Store the shake effect after the mouse is released
    if (!mouseIsPressed) {
      this.shakeOffset = this.shakeFactor;  // Save the final shake position
    }

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}
