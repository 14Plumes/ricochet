function Bouncer(opts) {
    const {
        actor = null,
        lower = 1,
        upper = 10,
    } = opts;

    Object.assign(this, {
        actor,
        lower,
        upper,
        frame: 0,
        pressedAt: 0,
    });
}

Bouncer.create = (...args) => new Bouncer(...args);

Bouncer.prototype = {
    bounce() {
        const distance = this.frame - this.pressedAt;

        if (distance > this.upper) {
            this.actor.kill();
        } else if (distance < this.lower) {
            this.actor.body.velocity.y *= Math.sqrt(1 + (this.lower / this.upper));
        } else {
            this.actor.body.velocity.y *= distance / this.upper;
        }
    },

    update(trigger) {
        this.frame += 1;
        if (trigger) {
            this.pressedAt = this.frame;
        }
    },
};

module.exports = Bouncer;
