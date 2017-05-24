const preloader = {};

preloader.preload = function preload() {
    this.game.load.image('water', './images/water.png');
    this.game.load.spritesheet('disc', './images/disc15x10.png', 15, 10, 6);
    this.game.load.spritesheet('splash', './images/splash19x32.png', 19, 32, 6);
    this.game.load.image('sky', './images/sky.png');
};

preloader.create = function create() {
    this.game.state.start('play');
};

module.exports = preloader;
