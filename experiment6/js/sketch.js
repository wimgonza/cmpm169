// sketch.js - The purpose of this sketch is to create text that is the opposite of the key pressed with visual fx.
// This site was used for reference for the text base. https://editor.p5js.org/generative-design/sketches/P_3_2_3_01
// I used ChatGPT to help me code this.
// Author: William Gonzalez
// Date: 2/17/25

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Globals
var typedKey = 'a';
var fontPath;

var spacing = 20;
var spaceWidth = 80;
var fontSize = 200;
var lineSpacing = fontSize * 1.2;
var textW = 0;
var letterX = 50 + spacing;
var letterY = lineSpacing;

var stepSize = 2;
var danceFactor = 1;

var font;
var pnts;

var freeze = false;

var lastTime = 0;
var strokeColor = [255, 255, 255];

// setup() function is called once when the program starts
function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  background(0);

  opentype.load('/cmpm169/experiment6/data/FreeSansNoPunch.otf', function(err, f) {
    if (err) {
      print(err);
    } else {
      font = f;
      pnts = getPoints(typedKey);
      loop();
    }
  });
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  if (!font) return;

  noFill();
  push();

  if (millis() - lastTime > 2000) {
    // Change stroke color randomly
    strokeColor = [random(255), random(255), random(255)];
    lastTime = millis();
  }

  stroke(strokeColor);

  // translation according to the actual writing position
  translate(letterX, letterY);

  // distortion on/off
  danceFactor = 1;
  if (mouseIsPressed && mouseButton == LEFT) danceFactor = map(mouseX, 0, width, 0, 3);

  // are there points to draw?
  if (pnts.length > 0) {
    // let the points dance
    for (var i = 0; i < pnts.length; i++) {
      pnts[i].x += random(-stepSize, stepSize) * danceFactor;
      pnts[i].y += random(-stepSize, stepSize) * danceFactor;
    }

    strokeWeight(0.1);
    beginShape();
    for (var i = 0; i < pnts.length; i++) {
      vertex(pnts[i].x, pnts[i].y);
      ellipse(pnts[i].x, pnts[i].y, 7, 7);
    }
    vertex(pnts[0].x, pnts[0].y);
    endShape();
  }

  pop();
}

function getPoints() {
  fontPath = font.getPath(typedKey, 0, 0, 200);
  var path = new g.Path(fontPath.commands);
  path = g.resampleByLength(path, 25);
  textW = path.bounds().width;
  // remove all commands without a coordinate
  for (var i = path.commands.length - 1; i >= 0 ; i--) {
    if (path.commands[i].x == undefined) {
      path.commands.splice(i, 1);
    }
  }
  return path.commands;
}

function keyReleased() {
  // export png
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
  if (keyCode == ALT) {
    // switch loop on/off
    freeze = !freeze;
    if (freeze) {
      noLoop();
    } else {
      loop();
    }
  }
}

function keyPressed() {
  switch (keyCode) {
  case ENTER:
  case RETURN:
    typedKey = '';
    pnts = getPoints(typedKey);
    letterY += lineSpacing;
    letterX = 50;
    break;
  case BACKSPACE:
  case DELETE:
    background(0);
    typedKey = '';
    pnts = getPoints(typedKey);
    letterX = 50;
    letterY = lineSpacing;
    freeze = false;
    loop();
    break;
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    let oppositeKey = getOppositeLetter(key);
    if (keyCode == 32) {
      typedKey = '';
      letterX += textW + spaceWidth;
      pnts = getPoints(typedKey);
    } else {
      typedKey = oppositeKey;
      letterX += textW + spacing;
      pnts = getPoints(typedKey);
    }
    freeze = false;
    loop();
  }
}

function getOppositeLetter(letter) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const reverseAlphabet = 'zyxwvutsrqponmlkjihgfedcba';

  if (alphabet.includes(letter)) {
    const index = alphabet.indexOf(letter);
    return reverseAlphabet[index];
  }
  else if (alphabet.toUpperCase().includes(letter)) {
    const index = alphabet.toUpperCase().indexOf(letter);
    return reverseAlphabet[index].toUpperCase();
  }
  return letter;
}
