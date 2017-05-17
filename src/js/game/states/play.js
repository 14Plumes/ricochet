const play = {};

function createWater(game) {
    const water = game.add.tileSprite(0, game.height - 70, game.world.width, 70, 'water');
    return water;
}

function createDisc(game) {
    const disc = game.add.sprite(game.world.centerX, game.world.centerY, 'disc');
    disc.anchor.setTo(0.5, 0.5);
    return disc;
}

play.create = function create() {
    this.game.stage.backgroundColor = '#eeeeee';
    createWater(this.game);
    createDisc(this.game);
};


module.exports = play;
