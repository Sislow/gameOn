alert("Loaded Game...");
var w = window.innerWidth;
var h = window.innerHeight;
var game = new Phaser.Game(w, h, Phaser.CANVAS,'gameDiv');

// players
var background, player;

// user inputs
var w,a,s,d;
var facing = 'left';
var grounded = 'true';
var fuel = 100;

var mainState = {
  preload:function() {
    game.load.image('bgimg', "../assets/background.jpg");
    game.load.spritesheet('hover_right', "../assets/sprites/spaceman/hover_right.png", 49.5, 72);
    game.load.spritesheet('hover_left', "../assets/sprites/spaceman/hover_left.png", 54, 72);
    game.load.spritesheet('walk_right', "../assets/sprites/spaceman/walk_right.png", 49.5, 75);
    game.load.spritesheet('walk_left', "../assets/sprites/spaceman/walk_left.png", 54, 72);

  },
  create:function() {

    // add game rules
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 300;

    background = game.add.tileSprite(0, 0, w,h,'bgimg');

    // moves S to the right then off the screen... idk why/how must read into
    // game.add.tween(player).to({ x: game.width }, 10000, Phaser.Easing.Linear.None, true);

    // player settings
    player = game.add.sprite(45, 300, 'hover_right');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    // global player settings
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 1000;
    player.body.maxVelocity.y = 500;
    player.body.setSize(20, 32, 5, 16);

    // player animations
    player.animations.add('walk_left', [1,2], 10, true);
    player.animations.add('walk_right', [1,2], 20, true);
    player.animations.add('hover_right', [1,2,3,4], 10, true);
    player.animations.add('hover_left', [1,2,3,4], 10, true);

    // initialize key inputs
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  },
  update:function() {
    background.tilePosition.x -=2;


    // movement logic
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('hover_left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.animations.play('hover_right');
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
    if (jumpButton.isDown && fuel > 0)
    {
        player.body.velocity.y = -300;
        fuel--;
    }
    if (!jumpButton.isDown) {
      fuel++;
    }

  }


}

game.state.add('mainState', mainState);
game.state.start('mainState');
