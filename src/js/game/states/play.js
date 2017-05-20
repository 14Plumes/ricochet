const play = {};

function createWater(game) {
    const water = game.add.tileSprite(0, game.height - 70, game.world.width, 70, 'water');

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
    const sky = game.add.tileSprite(0, height - 172, game.world.width, 172, 'sky');
    sky.scale.setTo(2, 2);
    game.stage.backgroundColor = '#0098f8';
    return sky;
}

play.create = function create() {
    this.game.stage.backgroundColor = '#eeeeee';
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 200;

    this.sky = createSky(this.game, this.game.height - 70);
    this.water = createWater(this.game);

    this.disc = createDisc(this.game);
};

play.update = function update() {
    this.game.physics.arcade.collide(this.disc, this.water);
};

play.render = function render() {
    // this.game.debug.body(this.disc);
    // this.game.debug.body(this.water);
};

module.exports = play;
