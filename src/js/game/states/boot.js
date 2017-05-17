const Stats = require('../../lib/stats.min');
const properties = require('../properties');

const boot = {};

function addStats(game) {
    const stats = new Stats();

    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);

    // Monkey patch Phaser's update in order to correctly monitor FPS.
    const oldUpdate = game.update;

    // Return new update function
    return (...args) => {
        stats.begin();
        oldUpdate.call(game, ...args);
        stats.end();
    };
}

boot.create = function create() {
    if (properties.showStats) {
        this.game.update = addStats(this.game);
    }

    this.game.sound.mute = properties.mute;

    this.game.state.start('preloader');
};


module.exports = boot;
