alert("Loaded Game...");

var game = new Phaser.Game(800, 600, Phaser.CANVAS,'gameDiv');

var background, sprite;
function goFull(){game.stage.scale.startFullScreen();}
var mainState = {
  preload:function() {
    game.load.image('background', "../assets/background.jpg");
    game.load.spritesheet('sm', "../assets/sprites/spaceman/hover_right.png", 54, 72);

  },
  create:function() {
    background = game.add.tileSprite(0, 0, 800,600,'background');
    sprite = game.add.sprite(40, 300, 'sm');
    sprite.animations.add('hover');
    sprite.animations.play('walk', 50, true);
    // moves SM to the right then off the screen... idk why/how must read into
    // game.add.tween(sprite).to({ x: game.width }, 10000, Phaser.Easing.Linear.None, true);
    game.input.onDown.add(goFull, this);
  },
  update:function() {
    background.tilePosition.x +=2;

  }


}

game.state.add('mainState', mainState);
game.state.start('mainState');
