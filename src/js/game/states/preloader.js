const preloader = {};

preloader.preload = function preload() {
    this.game.load.image('planet', 'images/planet.png');
    this.game.load.image('ship', 'images/ship.png');
};

preloader.create = function create() {
    this.game.state.start('game');
};

module.exports = preloader;
