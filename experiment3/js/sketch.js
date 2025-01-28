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
    snowflakes.push(new snowflake());
  }

  for (let flake of snowflakes) {
    if (mouseIsPressed) {
      flake.moveTowardsMouse(t);
      flake.rotateAroundMouse(t);
    } else {
      flake.update(t);
    }
    flake.display();
  }
}

// snowflake class
function snowflake() {
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

  this.moveTowardsMouse = function(time) {
    let distanceToMouse = dist(this.posX, this.posY, mouseX, mouseY);

    if (distanceToMouse > 1) {
      let angleToMouse = atan2(mouseY - this.posY, mouseX - this.posX);
      let moveSpeed = map(distanceToMouse, 0, width, 0, 0.5); // move faster when far, slower when close
      this.posX += cos(angleToMouse) * moveSpeed;
      this.posY += sin(angleToMouse) * moveSpeed;
    }
  };

  this.rotateAroundMouse = function(time) {
    let distanceToMouse = dist(this.posX, this.posY, mouseX, mouseY);

    if (distanceToMouse < 75) { 
      this.rotationFactor = lerp(this.rotationFactor, 1, transitionSpeed);
    }

    if (this.rotationFactor > 0) {
      let angleOffset = random(TWO_PI);
      let baseRadius = map(distanceToMouse, 0, 75, 50, 10);
      let radius = baseRadius + this.randomOffset + this.initialRadius;

      let angle = time * 0.1 + this.initialangle + angleOffset;

      this.posX = mouseX + radius * cos(angle);
      this.posY = mouseY + radius * sin(angle);
    }
  };
}