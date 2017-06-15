require("../css/reset.css")
require("../css/style.css")
let $ = require("jquery")
const p5 = require("p5")

var canvasHandler = (p)=>{

  var points = []
  var edges = []

  function Point(x, y, z) {
    this.pos = p.createVector(x, y)
    this.vel = p.createVector(0,0)
    this.acc = p.createVector(0,0)
    this.z = z
    this.connected = []
    this.draw = ()=>{
      this.acc = p.createVector(0,0)
      this.connected.forEach((other)=>{
        let noise1 = p.noise(Math.random() * 1000) - 0.5
        let noise2 = p.noise(Math.random() * 1000) - 0.5

        let transparency = (this.z + other.z)/20.

        p.stroke("rgba(255,255,255,"+transparency+")")
        p.strokeWeight(transparency)
        p.line(this.pos.x, this.pos.y,
               other.pos.x, other.pos.y)

        let force = p5.Vector.sub(other.pos, this.pos);
        var d = force.mag();
        d = p.constrain(d, 1, 35);

        let strength = 0.1 / (d * d)
        force.setMag(strength)

        if (d < 20) {
          force.mult(-30);
        }

        this.acc.add(force)
      })
      this.vel.add(this.acc)
      this.vel.limit(2)
      
      this.pos.add(this.vel)
      this.pos.x = p.constrain(this.pos.x, 0, p.windowWidth)
      this.pos.y = p.constrain(this.pos.y, 0, p.windowHeight)
    }
  }

  function initialize() {
    let dots = 15
    points = []
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

  }


  p.setup = ()=>{
    p.createCanvas(window.innerWidth, window.innerHeight)
    p.stroke(255)
    // p.frameRate(1)
    initialize()
  }
  p.draw = ()=>{
    p.clear()
    points.forEach((point)=>{
      point.draw()
    })
  }
}

var animation = new p5(canvasHandler ,"background-canvas")