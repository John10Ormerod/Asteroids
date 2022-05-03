function Particle(x, y) {
  this.pos = createVector(x, y);
  this.lifespan = random(180, 255);//random(255);
  this.vel = p5.Vector.random2D();
  this.vel.mult(random(15));
  this.done = false;
  

  this.update = function() {
    //this.vel.mult(0.99);
    this.lifespan -= 1;
    if(this.lifespan <= 0) {
      this.done = true;
    }

    this.accn = createVector(0, 0);
    this.accn.add(0, 0);
    this.vel.add(this.accn);
    this.pos.add(this.vel);
    this.accn.mult(0);
  }  
  
  this.render = function() {
    push();
    var fact = this.lifespan/255;
    strokeWeight(2); //255/this.lifespan);
    stroke(255-this.lifespan, 0, this.lifespan); //, this.lifespan);
    //point(this.pos.x, this.pos.y);
    ellipse(this.pos.x, this.pos.y, 10 * fact, 10 * fact);
    pop();
  }
}