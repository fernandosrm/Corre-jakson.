var path,boy, leftBoundary,rightBoundary;
var pathImg,boyImg;
var coin,coinImg
var coinGroup
var boyGroup

var score

var bomb, bombImg,bombGroup



function preload(){
  pathImg = loadImage("path.png")
  //loadImage de path (camino)
  boyImg = loadAnimation("Jake1.png","Jake2.png","Jake3.png", "Jake4.png", "Jake5.png")
  //loadAnimation de boy (niño)
  coinImg = loadImage("coin.png")
  //Coin
  bombImg = loadImage("bomb.png")
  
  
}

function setup(){
  createCanvas(350,400);
 //crear sprite de path (camino) 
 path = createSprite(400,400,100,100)
//agregar imagen de path
 path.addImage("camino", pathImg)
 path.scale=0.8;
//Hacer que la pista sea un fondo en movimiento al darle velocidad Y.
path.x=path.width /2


//crear sprite de boy (niño)
boy = createSprite(150,300,200,200)
//agregar animación para boy
boy.addAnimation("corriendo boy", boyImg)
boy.scale=0.7;
bombGroup = createGroup()
coinGroup = createGroup()
boyGroup = createGroup()
// crear  left Boundary (límite izquierdo)
leftBoundary=createSprite(1,0,80,800);
////establecer visibilidad como false (falso) para límite izquierdo
leftBoundary.visible = false
//crear right Boundary (límite derecho)
rightBoundary=createSprite(320,0,100,2000);
//establecer visibilidad como false (falso) para límite izquierdo
rightBoundary.visible = false

//score
 score = 0

}

function draw() {
  
  background("black");

  text("coins" + score ,280 ,400)
//ver la distancia de colision
  //boy.debug=true
  boy.setCollider("rectangle",0,0,40,120)
  
  
 

  path.velocityY = 4;
  
   
  // boy moviéndose en el eje X con el mouse
  boy.x=World.mouseX
  
  
  edges= createEdgeSprites();
  boy.collide(edges[3]);
  // colisión de boy con los límites derecho e izquierdo invisibles 
  boy.bounceOff(rightBoundary)
  boy.bounceOff(leftBoundary)
  //código para reiniciar el fondo
  if(path.y > 300 ){
    path.y = height/2;
  }
  

 spwanCoins()
 spwanBomb()

  drawSprites();
}



function spwanCoins() {
  if (frameCount % 100 === 0) {
    var coin = createSprite(150, 200, 100, 100);
    coin.y = Math.round(random(10, 60));
    coin.x = Math.round(random(270,50))
    coin.addImage(coinImg);
    coin.scale = 0.4;
    coin.velocityY = 2;
    coinGroup.add(coin);
    coin.lifetime = 200
  }


  // Verificar si el personaje toca una moneda
  for (var i = 0; i < coinGroup.length; i++) {
    if (boy.isTouching(coinGroup.get(i))) {
      score = score + 1;
      coinGroup.get(i).destroy();
    }
  }
}

function spwanBomb(){
  if(frameCount % 180 === 0){
    bomb = createSprite(150,200,100,100)
    bomb.y = Math.round(random(10, 60))
    bomb.x = Math.round(random(267,50))
    bomb.addImage(bombImg)
    bomb.scale=0.1
    bomb.velocityY = 2
    bombGroup.add(bomb)
    bomb.lifetime = 200
   }
  
   for (var i = 0; i < bombGroup.length; i++) {
    if (boy.isTouching(bombGroup.get(i))) {
      bombGroup.get(i).destroy();
      score = score - 1
    }
  }
}
