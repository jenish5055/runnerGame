var ground,groundImg
var player,playerImg,playerFall
var bg,bgImg
var vel=10
var obstacle1,obstacle2
var gem1,gem2,gemsGroup
var obstacleGroup
var zombie,zombieImg
var PLAY=1,END=0
var gameState=PLAY
var score=0
var gameoverImg,gameover
function preload() {

  playerImg= loadAnimation("tile000.png","tile001.png",
  "tile002.png","tile003.png","tile004.png")
  playerFall= loadAnimation("tile010.png","tile011.png")
  bgImg = loadImage("bg1.jpeg")
  obstacle1= loadImage("ghost.png")
  obstacle2= loadImage("hand.png")
 // zombieImg= loadImage("zombie1.png")
    zombieImg= loadAnimation("z1.png",
    "z2.png","z3.png","z4.png")
   gem1=loadImage("gem1.png")
   gem2=loadImage("gem2.png")
   gameoverImg=loadImage("gameo.jpg")
}



function setup() {
  createCanvas(700,300);



  ground=createSprite(width/2,height-10,width,10);
   bg=createSprite(width/2,height/2,)
   bg.velocityX=-vel
   bg.scale=0.5

   bg.addImage(bgImg)


   gameover=createSprite(width/2,height/2)
   gameover.addImage(gameoverImg)
   gameover.scale=1.2



   
   zombie=createSprite(90,220,50,50)
   //zombie.addImage(zombieImg)
   zombie.scale=0.8
  //  zombie.mirrorX(-1)
   zombie.addAnimation("zombieRun",zombieImg)
   
   
   player=createSprite(300,200,10,100)
   player.addAnimation("playerRun",playerImg)
   player.addAnimation("playerfall",playerFall)
   obstacleGroup=new Group()
   gemsGroup=new Group()

}

function draw() {
  background(200,255,255);  
if(gameState==PLAY){
  gameover.visible=false
  if(bg.x<0){
    bg.x=width/2
  }
  if(keyDown("SPACE")){
    player.velocityY=-10  
    
  }
  player.velocityY+=0.5 
   

  
  spawnObstacles()
  spawnGems()
  
  if(player.isTouching(obstacleGroup)){
  gameState=END
  
  
  }
  player.overlap(gemsGroup,(p,g)=>{
    g.remove()
    score+=2
  })

}else if(gameState==END){
 bg.velocityX= 0
player.changeAnimation("playerfall",playerFall)
obstacleGroup.setVelocityXEach(0)
obstacleGroup.setLifetimeEach(-1)
gameover.visible=true
player.remove()
zombie.remove()
gemsGroup.destroyEach()

}





player.collide (ground)

  drawSprites();
  fill("WHITE")
  text("Score: "+score,10,30)
}

function spawnObstacles(){
  if(frameCount%100==0){
  var obstacle =createSprite(width+10,250)
  obstacle.velocityX=-vel
  obstacle.lifetime=200
  obstacleGroup.add(obstacle)


  var r=random([1,2])
  switch (r){


    case 1 : obstacle.addImage(obstacle1);
    obstacle.scale=0.4
    break

    case 2 : obstacle.addImage(obstacle2);
    obstacle.scale=0.6
    break
    
  }
  

  }
}

function spawnGems(){
  if(frameCount%random([120,80,40,150])==0){
    var gems =createSprite(width+10,random(10,height-10))
    gems.velocityX=-vel
    gems.lifetime=200
    gemsGroup.add(gems)
  
  
    var r=random([1,2])
    switch (r){
  
  
      case 1 : gems.addImage(gem1);
     gems.scale=0.05
      break
  
      case 2 : gems.addImage(gem2);
     
       gems.scale=0.0115  
      break
      
    }
    
  
    }


}

