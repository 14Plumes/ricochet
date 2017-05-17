const play = {};

function createWater(game) {
    const water = game.add.tileSprite(0, game.height - 70, game.world.width, 70, 'water');
    return water;
}

play.create = function create() {
    this.game.stage.backgroundColor = '#eeeeee';
    createWater(this.game);
};


module.exports = play;
