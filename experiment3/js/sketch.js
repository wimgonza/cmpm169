// sketch.js - The purpose of this sketch is to create a canvas that has randomly falling snow, but when the left mouse button is pressed, the snowflakes will rotate around the cursor.
// This site was used for reference for the falling snowflakes base. https://editor.p5js.org/p5/sketches/Simulate:_SnowflakeParticleSystem
// This site was used for inspiration for the snowflakes changing position. https://editor.p5js.org/p5/sketches/Simulate:_SmokeParticleSystem
// I used ChatGPT to help me code this.
// Author: William Gonzalez
// Date: 1/27/25

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Globals
// Globals
let snowflakes = []; // array to hold snowflake objects
let transitionSpeed = 0.05; // speed of the transition (higher is faster)

// setup() function is called once when the program starts
function setup() {
  createCanvas(400, 600);
  noStroke();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background('green'); // Set the background to green
  let t = frameCount / 60; // update time

  // Create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    if (mouseIsPressed) {
      flake.moveTowardsMouse(t); // Move towards mouse when pressed
      flake.rotateAroundMouse(t); // Start rotating around mouse as they approach
    } else {
      flake.update(t); // update snowflake position
    }
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
  this.radius = sqrt(random(pow(width / 2, 2)));

  // Random offset to vary the radius when rotating around the mouse
  this.randomOffset = random(10, 30); // Random offset for each snowflake's rotation
  
  // Initial random range for rotating snowflakes
  this.initialRadius = random(50, 150); // Start radius between 50 to 150 pixels

  // Random color for each snowflake (either red or white)
  this.color = random() > 0.5 ? color(255, 0, 0) : color(255); // Randomly red or white

  // To track if snowflake is close enough to start rotating
  this.rotationFactor = 0; // Starts at 0, gradually increases as it gets closer to the mouse

  this.update = function(time) {
    // When the mouse is not pressed, return to normal falling behavior
    if (!mouseIsPressed) {
      let w = 0.6; // angular speed
      let angle = w * time + this.initialangle;
      this.posX = width / 2 + this.radius * sin(angle);

      // different size snowflakes fall at slightly different y speeds
      this.posY += pow(this.size, 0.5);
    }

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    fill(this.color); // Apply the random red or white color
    ellipse(this.posX, this.posY, this.size);
  };

  // Method to move snowflakes towards the mouse
  this.moveTowardsMouse = function(time) {
    let distanceToMouse = dist(this.posX, this.posY, mouseX, mouseY);

    // Move snowflake towards the mouse position
    if (distanceToMouse > 1) {
      let angleToMouse = atan2(mouseY - this.posY, mouseX - this.posX);
      let moveSpeed = map(distanceToMouse, 0, width, 0, 0.5); // move faster when far, slower when close
      this.posX += cos(angleToMouse) * moveSpeed;
      this.posY += sin(angleToMouse) * moveSpeed;
    }
  };

  // Method to rotate the snowflake around the mouse as it gets closer
  this.rotateAroundMouse = function(time) {
    let distanceToMouse = dist(this.posX, this.posY, mouseX, mouseY);

    // Gradually increase rotation factor as snowflake gets closer to mouse
    if (distanceToMouse < 75) { // Smaller radius (distance threshold) for swirling
      this.rotationFactor = lerp(this.rotationFactor, 1, transitionSpeed); // Gradually increase rotation factor
    }

    // If rotationFactor is > 0, start rotating around the mouse
    if (this.rotationFactor > 0) {
      // Randomize the rotation pattern (not a perfect circle)
      let angleOffset = random(TWO_PI); // random angle to vary the rotation
      let baseRadius = map(distanceToMouse, 0, 75, 50, 10); // Vary radius as it gets closer
      let radius = baseRadius + this.randomOffset + this.initialRadius; // Apply random offset and initial radius

      let angle = time * 0.1 + this.initialangle + angleOffset;  // Add random variation to the rotation angle

      // Update the snowflake's position to follow a swirling motion around the mouse
      this.posX = mouseX + radius * cos(angle);
      this.posY = mouseY + radius * sin(angle);
    }
  };
}