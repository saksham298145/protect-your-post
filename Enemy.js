class Enemy {
  constructor(x, y, width, height,enemyPosition) {
   
    this.body = Bodies.rectangle(x, y, width, height);
    this.width = width;
    this.height = height;
    this.enemyPos=enemyPosition
    this.image = loadImage("enemy.png");

    World.add(world, this.body);
  }
  remove(index){
    
    setTimeout(() => {
      Matter.World.remove(world,enemies[index].body)
      delete enemies[index]
    }, 100);
        
    
      
    }
  display() {
    var pos = this.body.position;
    push();
    imageMode(CENTER);
    image(this.image, pos.x,pos.y, this.width, this.height);
   
    pop();
  }
}