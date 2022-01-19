class Explosion {
  constructor(x, y) {
   
    this.r = 30;
    this.body = Bodies.circle(x, y, this.r);
    this.image = loadImage("explosion.png");
   
    World.add(world, this.body);
  }

  remove(index){
     
    setTimeout(() => {
      Matter.World.remove(world,this.body)
      delete explosions[index]
    }, 100);
        
    
      
    }
  

  shoot() {
   var newAngle = mg.angle - 28;
    newAngle = newAngle *(3.14/180)
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {
      x: velocity.x *(540/3.14), y: velocity.y * (90/3.14)})
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    push();
    imageMode(CENTER);
    image(this.image, pos.x, pos.y, this.r, this.r);
    pop();

   
   

  
  }
}

