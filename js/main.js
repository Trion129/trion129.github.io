require("../css/reset.css")
require("../css/style.css")
let $ = require("jquery")
const p5 = require("p5")

var canvasHandler = (p)=>{

  let flock
  let points = []
  let edges = []
  let iterator = 4000
  let segmentLength = 100
  let transparencyFactor = 25
  let noOfFishes = 150
  let dots = 10

  let previous, now = null;

  function Point(x, y, z) {
    this.pos = p.createVector(x, y)
    this.vel = p.createVector(0,0)
    this.acc = p.createVector(0,0)
    this.z = z
    this.connected = []
    this.draw = ()=>{
      this.acc = p.createVector(0,0)
      this.connected.forEach((other)=>{
        let transparency = (this.z + other.z)/transparencyFactor

        p.stroke("rgba(255,255,255,"+transparency+")")
        p.strokeWeight(transparency)
        p.line(this.pos.x, this.pos.y,
               other.pos.x, other.pos.y)

        let force = p5.Vector.sub(other.pos, this.pos);
        var d = force.mag();
        d = p.constrain(d, 1, 25);

        let strength = d/10000
        force.setMag(strength)

        if(d < 5){
          force.mult(-1)
        }

        this.acc.add(force)
      })
      this.vel.add(this.acc)
      this.vel.limit(2)
      
      this.pos.add(this.vel)

      if(this.pos.x < 0){
        this.pos.x = 0;
        this.vel.mult(0)
      }
      else if(this.pos.x > p.windowWidth){
        this.pos.x = p.windowWidth
        this.vel.mult(0)
      }
      if(this.pos.y < 0){
        this.pos.y = 0;
        this.vel.mult(0)
      }
      else if(this.pos.y > p.windowHeight){
        this.pos.y = p.windowHeight
        this.vel.mult(0)
      }
    }
  }

  function initialize() {
    points = []
    edges = []
    iterator = 4000
    segmentLength = 100
    transparencyFactor = 25
    noOfFishes = 150
    dots = 10

    previous = null
    now = null
    for(let i = 0; i < dots; i++){
      points.push(new Point(
        p.random(p.windowWidth),
        p.random(p.windowHeight),
        p.random(5)))
    }

    for(let i = 0; i < dots; i++){
      points[i].connected.push(points[(i+1) % dots])
      points[i].connected.push(points[(i+2) % dots])
      points[i].connected.push(points[(i+3) % dots])
      points[(i+1) % dots].connected.push(points[i])
      points[(i+2) % dots].connected.push(points[i])
    }

    flock = new Flock();

    for (var i = 0; i < noOfFishes; i++) {
      var b = new Fish(p.random(0, p.windowWidth/2), p.random(0, 10));
      flock.addFish(b);
    }
  }


  /* Flock and Fish */
  function Flock() {
    this.fishes = [];
    
    this.run = ()=>{
      for (var i = 0; i < this.fishes.length; i++) {
        this.fishes[i].run(this.fishes);
      }
    }

    this.addFish = (b)=>{
      this.fishes.push(b);
    }
  }

  function Fish(x,y) {
    this.acceleration = p.createVector(0,0);
    this.velocity = p.createVector(p.random(-1,1),p.random(-1,1));
    this.position = p.createVector(x,y);
    this.r = 3.0;
    this.maxspeed = 1;    // Maximum speed
    this.maxforce = 0.05; // Maximum steering force

    this.run = (fishs)=>{
      this.flock(fishs);
      this.update();
      this.borders();
      this.render();
    }

    this.applyForce = (force)=>{
      // We could add mass here if we want A = F / M
      this.acceleration.add(force);
    }

    this.flock = (fishs)=>{
      var sep = this.separate(fishs);   // Separation
      var ali = this.align(fishs);      // Alignment
      var coh = this.cohesion(fishs);   // Cohesion
      // Arbitrarily weight these forces
      sep.mult(1.3);
      ali.mult(1.0);
      coh.mult(1.0);
      // Add the force vectors to acceleration
      this.applyForce(sep);
      this.applyForce(ali);
      this.applyForce(coh);
    }

    this.update = ()=>{
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }

    this.seek = (target)=>{
      var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
      // Normalize desired and scale to maximum speed
      desired.normalize();
      desired.mult(this.maxspeed);
      // Steering = Desired minus Velocity
      var steer = p5.Vector.sub(desired,this.velocity);
      steer.limit(this.maxforce);  // Limit to maximum steering force
      return steer;
    }

    this.render = ()=>{
      // Draw a triangle rotated in the direction of velocity
      var theta = this.velocity.heading() + p.radians(90);
      p.push();
      p.fill("rgba(41, 128, 185, 0.4)");
      p.noStroke();
      p.translate(this.position.x,this.position.y);
      p.rotate(theta-p.PI/2);
      p.ellipseMode(p.CENTER)
      p.ellipse(0,0, this.r*2, this.r)
      p.beginShape();
      p.vertex(-this.r, 0);
      p.vertex(-this.r*2, -this.r/2);
      p.vertex(-this.r*2, this.r/2);
      p.endShape(p.CLOSE);
      p.pop();
    }

    this.borders = ()=>{
      if (this.position.x < -this.r)  this.position.x = p.windowWidth +this.r;
      if (this.position.y < -this.r)  this.position.y = p.windowHeight+this.r;
      if (this.position.x > p.windowWidth +this.r) this.position.x = -this.r;
      if (this.position.y > p.windowHeight +this.r) this.position.y = -this.r;
    }

    this.separate = (fishs)=>{
      var desiredseparation = 25.0;
      var steer = p.createVector(0,0);
      var count = 0;
      // For every fish in the system, check if it's too close
      for (var i = 0; i < fishs.length; i++) {
        var d = p5.Vector.dist(this.position,fishs[i].position);
        // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
        if ((d > 0) && (d < desiredseparation)) {
          // Calculate vector pointing away from neighbor
          var diff = p5.Vector.sub(this.position,fishs[i].position);
          diff.normalize();
          diff.div(d);        // Weight by distance
          steer.add(diff);
          count++;            // Keep track of how many
        }
      }
      // Average -- divide by how many
      if (count > 0) {
        steer.div(count);
      }

      // As long as the vector is greater than 0
      if (steer.mag() > 0) {
        // Implement Reynolds: Steering = Desired - Velocity
        steer.normalize();
        steer.mult(this.maxspeed);
        steer.sub(this.velocity);
        steer.limit(this.maxforce);
      }
      return steer;
    }

    this.align = (fishs)=>{
      var neighbordist = 50;
      var sum = p.createVector(0,0);
      var count = 0;
      for (var i = 0; i < fishs.length; i++) {
        var d = p5.Vector.dist(this.position,fishs[i].position);
        if ((d > 0) && (d < neighbordist)) {
          sum.add(fishs[i].velocity);
          count++;
        }
      }
      if (count > 0) {
        sum.div(count);
        sum.normalize();
        sum.mult(this.maxspeed);
        var steer = p5.Vector.sub(sum,this.velocity);
        steer.limit(this.maxforce);
        return steer;
      } else {
        return p.createVector(0,0);
      }
    }

    this.cohesion = (fishs)=>{
      var neighbordist = 50;
      var sum = p.createVector(0,0);   // Start with empty vector to accumulate all locations
      var count = 0;
      for (var i = 0; i < fishs.length; i++) {
        var d = p5.Vector.dist(this.position,fishs[i].position);
        if ((d > 0) && (d < neighbordist)) {
          sum.add(fishs[i].position); // Add location
          count++;
        }
      }
      if (count > 0) {
        sum.div(count);
        return this.seek(sum);  // Steer towards the location
      } else {
        return p.createVector(0,0);
      }
    }
  }


  /* P5 methods */
  p.setup = ()=>{
    p.createCanvas(window.innerWidth, window.innerHeight)
    p.stroke(255)
    initialize()
  }
  p.draw = ()=>{
    p.clear()
    points.forEach((point)=>{
      point.draw()
    })
    flock.run()

    /* Glow Part */
    iterator++
    
    if(iterator > segmentLength){
      iterator = 0

      if(now != null){
        previous = now
        now = now.connected[p.floor(p.random(0, now.connected.length))]
      }
      else{
        previous = points[p.floor(p.random(0, points.length))]
        now = previous.connected[p.floor(p.random(0, previous.connected.length))]
      }
    }

    p.stroke("rgba(255,255,255,0.3)")
    p.strokeWeight(1.3)
    
    p.line(
        previous.pos.x,
        previous.pos.y,
        now.pos.x,
        now.pos.y)

    let difference = p5.Vector.sub(now.pos, previous.pos)
    let dist = now.pos.dist(previous.pos)
    difference.normalize()
    let newPos = p5.Vector.add(previous.pos, difference.mult(dist/segmentLength * iterator))
    p.ellipseMode(p.CENTER)
    p.ellipse(newPos.x, newPos.y, 5)

  }
  p.windowResized = ()=>{
    p.resizeCanvas(window.innerWidth, window.innerHeight);
    initialize();
  }
}

var animation = new p5(canvasHandler ,"background-canvas")