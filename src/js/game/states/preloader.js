const preloader = {};

preloader.preload = function preload() {
    this.game.load.image('water', 'images/water.png');
    this.game.load.image('disc', 'images/disc.png');
    this.game.load.image('sky', 'images/sky.png');
};

preloader.create = function create() {
    this.game.state.start('play');
};

module.exports = preloader;
