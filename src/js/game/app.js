const _ = require('lodash');
const properties = require('./properties');
const boot = require('./states/boot.js');
const preloader = require('./states/preloader.js');
const game = require('./states/game.js');

const states = {
    boot,
    preloader,
    game,
};

const gameInstance = new Phaser.Game(properties.size.x, properties.size.y, Phaser.AUTO, 'game');

// Automatically register each state.
_.each(states, (state, key) => {
    gameInstance.state.add(key, state);
});

gameInstance.state.start('boot');
