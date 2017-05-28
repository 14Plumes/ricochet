/**
 * A shadow for the disc
 */
function Shadow(game, opts) {
    Object.assign(this, {
        color: 0x000000,
        ground: 0,
        max_height: 0,
        size: 0,
    }, opts);

    this.graphics = game.add.graphics(0, this.ground);
    this.graphics.visible = false;
}

Shadow.create = (game, args) => new Shadow(game, args);

Shadow.prototype = {
    attachTo(actor) {
        this.actor = actor;
        this.graphics.beginFill(this.color);
        this.graphics.drawCircle(this.size / 2, -(this.size + actor.height), this.size);
        this.graphics.endFill();
        this.graphics.visible = this.actor.alive;
        return this;
    },

    update() {
        if (!this.actor.alive) {
            this.graphics.kill();
            return;
        }

        const gap = Math.abs(this.ground - this.actor.body.position.y);
        const factor = 1 - (gap / this.max_height);
        this.graphics.position.x = this.actor.body.position.x;
        this.graphics.scale.y = factor / 2;
        this.graphics.scale.x = factor;
        this.graphics.alpha = factor ** 2;
    },
};

module.exports = Shadow;
