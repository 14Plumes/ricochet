const play = {};

function createWater(game, height) {
    const water = game.add.tileSprite(0, height - 128, game.world.width, 128, 'water');

    game.physics.arcade.enable([water]);
    water.body.allowGravity = false;
    water.body.immovable = true;

    return water;
}

function createDisc(game) {
    const disc = game.add.sprite(game.world.centerX, game.world.centerY, 'disc');
    disc.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable([disc]);
    disc.body.bounce.y = 0.95;
    disc.body.collideWorldBounds = true;

    return disc;
}

function createSky(game, height) {
    const sky = game.add.tileSprite(0, height - 172, game.world.width, 88, 'sky');
    sky.scale.setTo(2, 2);
    game.stage.backgroundColor = '#0098f8';
    return sky;
}

function handleInput(game, sky, water) {
    const speed = 3;
    const key = game.input.keyboard;
    if (key.isDown(Phaser.Keyboard.LEFT)) {
        sky.tilePosition.x += speed / 2;
        water.tilePosition.x += speed;
    } else if (key.isDown(Phaser.Keyboard.RIGHT)) {
        sky.tilePosition.x -= speed / 2;
        water.tilePosition.x -= speed;
    }
}

play.create = function create() {
    this.game.stage.backgroundColor = '#eeeeee';
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 200;

    this.water = createWater(this.game, this.game.height);
    this.sky = createSky(this.game, this.water.top);

    this.disc = createDisc(this.game);
};

play.update = function update() {
    const { disc, water, sky, game } = this;
    game.physics.arcade.collide(disc, water);
    handleInput(game, sky, water);
};

play.render = function render() {
    // this.game.debug.body(this.disc);
    // this.game.debug.body(this.water);
};

module.exports = play;
