 var PLAY = 1;
 var END = 0;
 var gameState=PLAY;
 var monkey,monkey_running,monkey_collided;
 var banana ,bananaImage, obstacle, obstacleImage;
 var FoodGroup, obstacleGroup;
 var score;


  function preload() 
  {
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  }



  function setup()
  {
    
  bananaGroup=new Group(); 
  obstaclesGroup=new Group();  
    
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running)  
  monkey.scale=0.1;  
    
  ground=createSprite(400,350,900,10) 
    
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
    
  score=0;  
    
  }


  function draw() 
  {
  background("white")
  stroke("black")
  textSize(20)
  fill("black")  
  text("Survival Time:"+ score, 100,50);  
  if(gameState===PLAY)
  { 
   score =score+ Math.round(getFrameRate()/60);
      
  if(keyDown("space")&& monkey.y >= 230) 
  {
    monkey.velocityY = -12;
  }  
  monkey.velocityY = monkey.velocityY + 0.8  
  monkey.collide(ground); 
    
  if(obstaclesGroup.isTouching(monkey))
  {
    gameState=END;
    
  }  
   
  obstacles();
  banana();  
   
  }  
 else  if(gameState===END)
   {
    monkey.velocityY=0;
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    console.log("End of Gamestate");
   } 
  drawSprites(); 
  }

  function banana()
  {
    if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(100,140));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
    
  }
  function obstacles()
  {
    if (frameCount % 120 === 0){
   var obstacle = createSprite(600,329,10,40);
   obstacle.velocityX = -6;
   var rand = Math.round(random(1,6)); 
   obstacle.addImage(obstacleImage)   
   obstacle.scale = 0.1;
   obstacle.lifetime = 300;
   obstaclesGroup.add(obstacle);
 }
    
  }

