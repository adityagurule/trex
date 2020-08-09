var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImg,cGroup, oGroup;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, gameOver, gameOverimg, restart, restartimg;
var PLAY = 1;
var END = 0;
var gameState = PLAY, score=0;
var die, jump, cpoint;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  cloudImg=loadImage("cloud.png");
  
  groundImage = loadImage("ground2.png");
  
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
   
  gameOverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
  
  cpoint=loadSound("checkPoint.mp3");
  die=loadSound("die.mp3");
  jump=loadSound("jump.mp3");
}

function setup() {
  createCanvas(800, 300);
  
  trex = createSprite(50,280,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,280,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6+3*score/100);
  
  gameOver=createSprite(400,190,20,20);
  restart=createSprite(400,150,20,20);
  gameOver.addImage(gameOverimg);
  restart.addImage(restartimg);
  gameOver.scale=0.5;
  restart.scale=0.5;
    
  invisibleGround = createSprite(200,290,400,10);
  invisibleGround.visible = false;
  
  cGroup=new Group();
  oGroup=new Group();
  
}

function draw() {
  background(255);
   
  text("score = "+ score, 740,20);
  
  if(gameState===PLAY){
    
       if(keyDown("space")&&trex.y>=261) {
    trex.velocityY = -10;
    jump.play();
    }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
 score = score + Math.round(getFrameRate()/60);
    
  spawnClouds();
  spawnObstacles();
    
    restart.visible=false;
    gameOver.visible=false;
    
    if(oGroup.isTouching(trex)){
      gameState = END;
       //playSound("die.mp3");
    }
     }
  else if(gameState===  END){
           ground.velocityX = 0;
    trex.velocityY = 0;
    oGroup.setVelocityXEach(0);
    cGroup.setVelocityXEach(0);
    
    //change the trex animation
     
    //set lifetime of the game objects so that they are never destroyed
    oGroup.setLifetimeEach(-1);
    cGroup.setLifetimeEach(-1);
    
    gameOver.visible=true;
    restart.visible=true;
    
    trex.changeAnimation("collided", trex_collided);
    
    if(mousePressedOver(restart)){
       reset();
       }
    
    if (score>0 && score%100 === 0){ 
      cpoint.play();
    }
    
    }
  

 
  trex.collide(invisibleGround);
   
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(800,120,40,10);
    cloud.y = random(80,160);
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 267;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 40 === 0) {
    var obstacle = createSprite(800,265,10,40);
    obstacle.velocityX = -(6+3*score/100);;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
      console.log(rand);
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
        break;
        
         case 2:obstacle.addImage(obstacle2);
        break;
        
         case 3:obstacle.addImage(obstacle3);
        break;
        
         case 4:obstacle.addImage(obstacle4);
        break;
        
         case 5:obstacle.addImage(obstacle5);
        break;
        
         case 6:obstacle.addImage(obstacle6);
        break;
        
        default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime =134;
    oGroup.add(obstacle);
    //add each obstacle to the group
   
    // obstacle.setCollider("rectangle",0,0,50,40);
  }
}

function reset(){
  gameState= PLAY;
  trex.changeAnimation("running", trex_running);
  gameOver.visible=false;
  restart.visible=false;
  oGroup.destroyEach();
  cGroup.destroyEach();
}
