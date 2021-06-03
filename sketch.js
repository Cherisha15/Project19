var PLAY = 1;
var END = 0;
var gameState = PLAY;

var chick, chick_running, chickImg;
var forest, invisibleForest, forestImage;
var obstacleGroup, obstacle;

var jumpSound;

var sberry, sberryGroup;
var berry, berryGroup;

var score=0;

var gameOver, gameOverImg, gameoverSound;
var restart, restartImg; 

var bg, bgSound; 

  function preload(){
    
forestImage=loadImage("forest.jpg")    
    
chick_running = loadAnimation("back4.png","back6.png","back7.png" )
    
restartImg= loadImage("retry.png")
    
gameOverImg= loadImage("GameOverImg.png")
    
obstacle2Img= loadImage("dog.png")
    
sberryImg=loadImage("strawberry.png")
    
berryImg=loadImage("berry.png")
    
bgSound=loadSound("rainforestSound.mp3")
    
gameoverSound=loadSound("gameoversound.mp3")
    
checkPointSound=loadSound("checkpointsound.mp3")
    
  }

function setup() {
 createCanvas(600,400)
  
  bg=createSprite(300,200);
  bg.addImage(forestImage);
  bg.scale=0.999
  
  edges=createEdgeSprites();
  
  score=0;
  
  chick=createSprite(50,180,20,50)
  chick.addAnimation("running",chick_running);
  
  gameOver = createSprite(300,140);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;
  
  restart = createSprite(290,310);
  restart.addImage(restartImg);
  restart.scale=0.5;
  restart.visible=false;

  obstacleGroup=new Group();
  sberryGroup=new Group();
  berryGroup=new Group();
   
  obstacleGroup.debug=true; 
  
  bgSound.play();
  bgSound.loop();
    
   
}

function draw() {
  
  background(255);
  
  stroke("black")
  fill("orange")
  textSize(35)
  textFont("Monotype Corsiva");
  text("Highest Score: "+ score, 180, 360);
  
  chick.collide(edges[3]);
  
  if (gameState===PLAY){
    bg.visible=true;
    gameOver.visible=false;
    restart.visible=false;
    chick.visible=true;
    
    score = score + Math.round(getFrameRate()/60);
    bg.velocityX = -(6 + 2*score/500);
  
  if(keyDown("space") && chick.y >= 100) {
      chick.velocityY = -12; 
    }
  
    chick.velocityY = chick.velocityY + 0.8
  
   if (bg.x < 0){
      bg.x = bg.width/2;
    }
   
    spawnStrawberry();
    spawnBerry();

    spawnObstacle();
    
    chick.bounceOff(edges);
    
    if(chick.isTouching(sberryGroup)){
      score=score+2
      sberryGroup.destroyEach();
   
    }
       
    if(chick.isTouching(berryGroup)){
      score=score+1
      berryGroup.destroyEach();
    }
    
    if(chick.isTouching(obstacleGroup)){
      gameState=END;
      obstacleGroup.destroyEach();
      sberryGroup.destroyEach();
      berryGroup.destroyEach();
      gameoverSound.play();
    }
    
    if(score>0&&score%200===0){
      checkPointSound.play();
    }
    
  }
  
  else if(gameState===END){
    gameOver.visible=true;
    restart.visible=true;
    bg.visible=false;
    chick.visible=false
    bgSound.stop();
  }
    
  if(mousePressedOver(restart)) {
      reset();
    }
  
  
  
 drawSprites();
}

function spawnStrawberry() {
  
  if (frameCount % 100 === 0) {
    var sberry = createSprite(600,190,20,20);
    sberry.y = Math.round(random(360,120));
    sberry.addImage(sberryImg);
    sberry.scale=0.15;
    sberry.velocityX = -(6 + 2*score/500);
     
    sberry.lifetime = 180;
    
    sberryGroup.add(sberry);
  }
}

function spawnBerry() {
  
  if (frameCount % 80 === 0) {
    var berry = createSprite(600,190,20,20);
    berry.y = Math.round(random(360,120));
    berry.addImage(berryImg);
    berry.scale=0.15;
    berry.velocityX = -(6 + 2*score/500);
    
    berry.lifetime = 180;
    
    berryGroup.add(berry);
  }
}


function spawnObstacle() {
  
  if (frameCount % 220 === 0) {
    var obstacle = createSprite(600,190,20,20);
    obstacle.y = Math.round(random(330,330));
    obstacle.addImage(obstacle2Img);
    obstacle.scale=0.3;
    obstacle.velocityX = -(6 + 2*score/500);
    
    obstacle.lifetime = 180;
    
    obstacleGroup.add(obstacle);
    
   
  }
}

function reset(){
  gameState=PLAY;
  obstacleGroup.destroyEach();
  chick.addAnimation("running",chick_running);
  score=0;
  bgSound.play();
  bgSound.loop();
    
}
