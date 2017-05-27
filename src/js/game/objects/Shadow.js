/**
 * A shadow for the disc
 */
function Shadow(game, opts) {
    Object.assign(this, {
        color: 0x000000,
        ground: 0,
        max_height: 0,
    }, opts);

    this.graphics = game.add.graphics(0, this.ground);
    this.graphics.beginFill(this.color);
    this.graphics.drawCircle(8, -32, 16);
    this.graphics.endFill();
}

Shadow.create = (game, args) => new Shadow(game, args);

Shadow.prototype = {
    attachTo(actor) {
        this.actor = actor;
        return this;
    },

    update() {
        const gap = Math.abs(this.ground - this.actor.body.position.y);
        const factor = 1 - (gap / this.max_height);
        this.graphics.position.x = this.actor.body.position.x;
        this.graphics.scale.y = factor / 2;
        this.graphics.scale.x = factor;
        this.graphics.alpha = factor ** 2;
    },
};

module.exports = Shadow;
