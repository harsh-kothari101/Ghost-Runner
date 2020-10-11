var tower,towerI;
var door, doorI, doorsGroup;
var climber, climberI, climbersGroup;
var ghost, ghostI;
var invisibleBlock,invisibleBlockGroup;

var gameState = "play";

var spookySound;


function preload(){
  
  towerI = loadImage("tower.png");
  doorI = loadImage("door.png");
  climberI = loadImage("climber.png");  
  ghostI = loadImage("ghost-standing.png")
  spookySound = loadSound("spooky.wav");  
}


function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300,0,0);
  tower.addImage("tower",towerI);
  tower.velocityY=3;
  
  ghost = createSprite(300,300,0,0);
  ghost.addImage(ghostI);
  ghost.scale=0.3
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  spookySound.loop();

}

function draw(){
  
  if(gameState==="play"){
   
   if(tower.y>450){
      tower.y=300;
   }

   if(keyDown("space")){
      ghost.velocityY=-10;
   } 

    if(keyDown("left_arrow")){
      ghost.x = ghost.x-5
   }  

    if(keyDown("right_arrow")){
      ghost.x=ghost.x+5;
   } 

   ghost.velocityY = ghost.velocityY+0.8;

   if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;                   
   } 

   if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy() ;
      gameState = "end";
   
   } 

   spawnDoors();




   drawSprites();  

   
 }
  
 if(gameState==="end"){
    fill("Yellow");
    textSize(100);
    text("Game Over!!",20,300);
    
    }
  
  
 
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    door = createSprite(200,-50,0,0);
    door.addImage(doorI);
    door.velocityY=3;
  
    climber = createSprite(200,10,0,0);
    climber.addImage(climberI);  
    climber.velocityY=3;
    
    invisibleBlock = createSprite(200,15,0,0);
    invisibleBlock.velocityY=3;
    invisibleBlock.width=climber.width
    invisibleBlock.height=2
    
    invisibleBlock.visible=false;
    
    
    
    
    door.x = Math.round(random(100,500));
    climber.x=door.x;
    invisibleBlock.x=climber.x
    
    door.lifetime=500;
    climber.lifetime=500;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1
  
  
  }

}
