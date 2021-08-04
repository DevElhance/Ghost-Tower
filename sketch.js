var tower,towerImage, door, doorImage,climber, climberImage,doorG, climberG, ghost, ghostImage,invBlock,invBlockG;
var gameState="PLAY";

function preload(){
  
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  doorG= new Group();
  climberImage=loadImage("climber.png");
  climberG= new Group();
  ghostImage=loadImage("ghost-standing.png");
  invBlockG=new Group();
  spookySound=loadSound("spooky.wav");
}





function setup(){
  createCanvas(600,600);
  tower= createSprite(300,300);
  tower.addImage("Tower",towerImage);
  tower.velocityY = 1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("Ghost",ghostImage);
  ghost.scale= 0.3;
  
  //;
}


function draw(){
  background(0);
  if(gameState=="PLAY"){
    if(tower.y>400){
    tower.y=300;
  }
    spookySound.loop();
  spawnDoors();
  
  if(keyDown("left_arrow")){
  ghost.x= ghost.x-3;
     }
  if(keyDown("right_arrow")){
  ghost.x= ghost.x+3;
     }
  if(keyDown("space")){
  ghost.velocityY= -5;
    //spookySound.play();
     }
  ghost.velocityY= ghost.velocityY+0.8;
  
  
  if(climberG.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invBlockG.isTouching(ghost)|| ghost.y>600){
    ghost.destroy();
    gameState="END";
  }
  
   
    drawSprites();
  }
    if(gameState=="END"){
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("Game Over",230,250);
      
  }
  }
  
  
  
  
function spawnDoors(){
  if(frameCount%240==0){
    door= createSprite(200,-50);
    door.addImage("Door",doorImage);
    door.x= Math.round(random(120,400));
    door.velocityY = 1
    door.lifetime=800;
    doorG.add(door);
    
  ghost.depth= door.depth;
  ghost.depth=ghost.depth+1;
    
    
    climber= createSprite(200,10);
    climber.addImage("climber",climberImage);
    climber.x= door.x;
    climber.velocityY = 1
    climber.lifetime=800;
    climberG.add(climber);
    
    invBlock=createSprite(200,15);
    invBlock.width=climber.width;
    invBlock.height=2;
    invBlock.x=door.x;
    invBlock.velocityY=1;
    invBlock.lifetime=800;
    invBlockG.add(invBlock);
  }
}



