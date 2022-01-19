const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
let engine;
let world;
var fort
var explosions=[]
var enemies=[]
var bullets=[]
var score=0
isgameOver=false


var sound

function preload()
{
  bg_img = loadImage('bg.png');
  fortImage=loadImage("fort.png")
  tankImage=loadImage('tank.png')
 sound=loadSound("e.wav")
 
}
function setup() {
  
    createCanvas(windowWidth,windowHeight);
  
    angleMode(DEGREES)
    angle=PI/4
    engine = Engine.create();
    world = engine.world;
    fort = Bodies.rectangle(50, 350, 160, 310, { isStatic: true });
    World.add(world,fort);
    
    tank=Bodies.rectangle(500, 500, 250, 250, { isStatic: true });
    World.add(world,tank);
     mg=new Maingun(630,520,55,55,angle)
    
  }
  function draw() 
{

  background(51);
  image(bg_img,0,0,width,height);
  
  
  push();
  translate(fort.position.x, fort.position.y);

  image(fortImage, 50,50, 320, 320);
  pop();
  push();
  translate(tank.position.x, tank.position.y);
  
 imageMode(CENTER)
  image(tankImage, 50,50, 160, 310);
  pop();
 

  showenemies()
  textSize(30)
  text("Score:"+score,100,100)
 
  for (var i = 0; i < explosions.length; i++) {
    showExplosions(explosions[i], i);
    Collision(i);

  }
 
  mg.display()
  
  Engine.update(engine); 
}
  


function Collision(index){
  for (var i = 0; i < enemies.length; i++) {
    if (explosions[index] !== undefined && enemies[i] !== undefined) {
      var collision = Matter.SAT.collides(explosions[index].body,enemies[i].body);

      if (collision.collided) {
          enemies[i].remove(i);
        

        Matter.World.remove(world, explosions[index].body);
        delete explosions[index];
        score=score+5


      }
    }
  }
}


   
  
 
  
 

function keyPressed() {
  if (keyCode === 32) {
 
    

      var explosion = new Explosion(mg.x,mg.y);

    
    
      explosions.push(explosion);
      
    }
  }
  function showExplosions(explosion,index){
    if(explosion){
      explosion.display()
    }
  } 
  function showenemies() {
    if(enemies.length>0) {
      if(enemies[enemies.length-1] === undefined || enemies[enemies.length-1].body.position.x < width - 300) {
        var positions = [-60, -80, -90, -50];
       var position = random(positions);
        var enemy = new Enemy(width, height-100, 170,170,position);
        enemies.push(enemy);
      }
      for (var i = 0; i < enemies.length; i++) {
        if (enemies[i]) {
          Matter.Body.setVelocity(enemies[i].body,{x:-0.9 ,y:-0.3});
          enemies[i].display();
          var collision2 = Matter.SAT.collides(tank,enemies[i].body);

          if (collision2.collided) {
            gameOver()
  
          }      
            
        } else {
          enemies[i];
        }
      }
    }
    else {
      var enemy = new Enemy(width ,height -60, 170, 170, -60);
      enemies.push(enemy);
    }
  }  
   
  function keyReleased() {
    if (keyCode === 32) {
      if (explosions.length) {
       sound.play()
        explosions[explosions.length - 1].shoot();
      }
    }
  }
  function gameOver() {
    swal(
      {
        title: `Game Over!!!`,
        text: "Thanks for playing!!",
        imageUrl:
          "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
        imageSize: "150x150",
        confirmButtonText: "Play Again"
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }