// let inconsolata;
// function preload() {
//   inconsolata = loadFont('assets/inconsolata.otf');
// }
// function setup() {
//   createCanvas(100, 100, WEBGL);
//   textFont(inconsolata);
//   textSize(width / 3);
//   textAlign(CENTER, CENTER);
// }
// function draw() {
//   background(0);
//   let time = millis();
//   rotateX(time / 1000);
//   rotateZ(time / 1234);
//   text('p5.js', 0, 0);
// }



var ship;
var asteroids = [];
var particles = [];
var lasers = [];
var score = 0;
var level = 1;
var lives = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  
  for (var i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
  
  //text('p5.js', 0, 0);
}

function draw() {
  background(0);
  
  fill(0, 255, 255);
  textSize(24);
  text("Level: " + level + "   Score: " + score + "   Lives: " + lives + "   n_Particles: " + particles.length, 10, 25);
  
  
  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      //console.log('oops!');
      lives -= 1;
      ship.hasExploded = true;
      ship.explode(ship.pos.x, ship.pos.y);
      asteroids.splice(i, 1);
      //next ship, and subtract from total, maintain score
      break;
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }
  
  for (var j = lasers.length - 1; j >= 0; j--) {
    //console.log(lasers[j].age);
    if (lasers[j].age <= 0) {
      lasers.splice(j, 1);
    }
  }
  
  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    lasers[i].edges();
    for(var j = asteroids.length - 1; j >= 0 ; j--) {
      if (lasers[i].hits(asteroids[j])) {
        if (asteroids[j].r > 15) {
          var newAsteroids = asteroids[j].breakup();
          asteroids = asteroids.concat(newAsteroids);
        }
        asteroids.splice(j, 1);
        lasers.splice(i, 1);
        score += 20;
        break;
      }
    }
    
  }
  //console.log(lasers);

  ship.render();
  ship.turn(0.1);
  ship.update();
  ship.edges();
  
  for (var i = particles.length-1; i >= 0 ; i--) {
    //particles[i].applyForce(gravity);
    particles[i].update();
    particles[i].render();
    if(particles[i].done) {
      particles.splice(i,1);
    }
  }


  if (lives <= 0) {
    //background(0);
  
    fill(0, 255, 255);
    textSize(48);
    text("Final Score", 50, 100);
    text("Level: " + level + "   Score: " + score + "   Lives: " + lives, 50, 150);
    text("Insert Coin: Press I", 50, 200);
    noLoop();
  }
  if (asteroids.length == 0){
    // you won this level
    // print score
    level += 1;
    for (var i = 0; i < (5-1+level); i++) {
      asteroids.push(new Asteroid());
    }

  } else {
    // print score
    // update speeds and number of asteroids on screen
    // reset and start again but maintain score
  }
  
}

function keyPressed() {
  if(keyCode == RIGHT_ARROW) {
    ship.setRotation(0.05);
  } else if(keyCode == LEFT_ARROW) {
    ship.setRotation(-0.05);
  } else if(keyCode == UP_ARROW) {
    ship.boosting(true);
  } else if(key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if(key == 'i') {
    splice(asteroids, 0, asteroids.length);
    lives = 5;
    loop();
    setup();
  }
}

function keyReleased() {
if(keyCode == RIGHT_ARROW) {
    ship.setRotation(0.0);
  } else if(keyCode == LEFT_ARROW) {
    ship.setRotation(0.0);
  } else if(keyCode == UP_ARROW) {
    ship.boosting(false);
  }   
}