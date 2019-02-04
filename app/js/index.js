const heroBanner = document.querySelector('.hero-banner')

// Pixi

const pixiInit = function() {
  
}

let pixiApp = new PIXI.Application(window.innerWidth, window.innerHeight, {
  backgroundColor: 0x031E33,
  autoResize: true,
  resolution: devicePixelRatio
})
var mouseposition = pixiApp.renderer.plugins.interaction.mouse.global;
let pointerPositionX = 0;
let pointerPositionY = 0;

let mainHeader = new PIXI.Text('Christopher William Nekich', {
  fontWeight: 'bold',
  fontFamily: 'Arial',
  fontSize: 64,
  fill: 0xffffff,
})

let centerAnchor = new PIXI.ObservablePoint(function(){}, mainHeader, 0.5, 0.5)
mainHeader.anchor = centerAnchor
mainHeader.x = window.innerWidth / 2
mainHeader.y = window.innerHeight / 2

var xCenter = window.innerWidth / 2;
var yCenter = window.innerHeight / 2;
var movementVariable = 0.1;


var menuSpritesheet = PIXI.BaseTexture.fromImage("https://res.cloudinary.com/dyqesnour/image/upload/v1543288640/Portfolio/spritesheet.png");

var idleTexture = new PIXI.Texture(menuSpritesheet, new PIXI.Rectangle(50, 0, 50, 50))
var lightgreenTexture = new PIXI.Texture(menuSpritesheet, new PIXI.Rectangle(0, 0, 50, 50))

var idleSprite = new PIXI.Sprite(idleTexture)
idleSprite.interactive = true;
idleSprite.on('pointerover', function(){
  this.texture = lightgreenTexture;
  console.log('test')
  this.scale.set(2, 2)
  this.pivot.set(25, 25)
})

idleSprite.on('pointerout', function() {
  this.texture = idleTexture;
  console.log('testout')
})

pixiApp.stage.addChild(idleSprite)

pixiApp.stage.addChild(mainHeader)

pixiApp.ticker.add(function(){



  // console.log((xCenter - mouseposition.x) / xCenter * movementVariable)

  mainHeader.x = xCenter - ( (xCenter - pointerPositionX) / /*xCenter  * */( 1 / movementVariable ) )
  mainHeader.y = yCenter - ( (yCenter - pointerPositionY) / ( 1 / movementVariable ) )

  // console.log(mainHeader.x)
  // console.log((test) + (test - mouseposition.x), test, mouseposition.x)
  // pixiApp.renderer.resize(window.innerWidth, window.innerHeight)
})

heroBanner.appendChild(pixiApp.view)

window.addEventListener('resize', function(){
  const parent = pixiApp.view.parentNode
  pixiApp.renderer.resize(parent.clientWidth, parent.clientHeight)
  xCenter = parent.clientWidth / 2
  yCenter = parent.clientHeight / 2
  mainHeader.scale.set(0.4)
})

window.addEventListener('scroll', function(){
  yCenter = (window.innerHeight / 2) - window.pageYOffset
  console.log(yCenter)
})

pixiApp.renderer.plugins.interaction.on( 'pointermove', ( event ) => {
    pointerPositionX = event.data.global.x 
    pointerPositionY = event.data.global.y
    console.log("move")
  });

pixiApp.renderer.plugins.interaction.on( 'pointerdown', ( event ) => {
  console.log("tap")
  pointerPositionX = event.data.global.x 
  pointerPositionY = event.data.global.y 
})