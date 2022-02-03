
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario, mario_running, mario_collided, mario_walk;
var invisibleGround;
var obstaclesGroup,obstacle1,obstacle2,obstacle3
var score=0;

function preload(){
  mario_running =   loadAnimation("images/walk1.png","images/walk2.png","images/walk3.png");
  mario_collided = loadAnimation("images/marioUp.png");
 
  
  groundImage = loadImage("images/ground.png");
  backgroundImage = loadImage("images/day.jpg");
  
  cloudImage = loadImage("images/cloud.png");
  
   
  obstacle1 = loadImage("images/pipe.png");
  obstacle2 = loadImage("images/flowerPipe.png");
  obstacle3 = loadImage("images/mushroom.png");
  
  gameOverImg = loadImage("images/gameOverText.png");
  restartImg = loadImage("images/restart.png");
}

function setup() {
  createCanvas(1200, 400);
  mario = createSprite(50,300,20,40);
  mario.addAnimation("running", mario_running);
  mario.addAnimation("collided", mario_collided);
  mario.scale = 0.7;

  ground = createSprite(400,330,700,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
  ground.velocityX = -4
 
  invisibleGround = createSprite(400,340,700,10)
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
 

}

function draw () {
  background(backgroundImage);
  textSize(20);
  fill("red");
  text("Score:"+ score,900,20);
  
 
  score = score + Math.round(frameCount/60);

  if(keyDown("space")&& mario.y >= 100) {
    mario.velocityY = -13;
  }
    
  mario.velocityY= mario.velocityY + 0.8 

  if (ground.x < 0){
    ground.x = ground.width/2;
  }
 
  mario.collide(invisibleGround);
   spawnObstacles();
   
     
  drawSprites();
  }



  function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(400,310,10,40);
      obstacle.velocityX = -6;
      
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: obstacle.addImage(obstacle1);
                 break;
         case 2: obstacle.addImage(obstacle2);
                 break;
         case 3: obstacle.addImage(obstacle3);
                 break;

         default: break;
       }
       obstacle.scale = 0.5;
       obstacle.lifetime = 300;
       obstaclesGroup.add(obstacle);
      }
    }

  