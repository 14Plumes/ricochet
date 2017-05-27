/**
 * A Bouncer handles the player's controls on an object's bounce
 */
function Bouncer(opts) {
    Object.assign(this, {
        actor: null,
        timings: {
            // TODO adjust the default timings
            perfect: 0,
            good: 2,
            poor: 5,
        },
    }, opts);

    this.reset();
}

Bouncer.create = (...args) => new Bouncer(...args);

Bouncer.prototype = {
    reset() {
        Object.assign(this, {
            frame: 0,
            didBounce: false,
            bouncedAt: 0,
            didTrigger: false,
            triggeredAt: 0,
        });
    },

    // True if too much time elapsed after the bounce
    timedOut() {
        return this.didBounce && this.frame - this.bouncedAt > this.timings.poor;
    },

    update(trigger, bounced) {
        this.frame += 1;

        // Register trigger and bounce events
        if (bounced && !this.didBounce) {
            this.didBounce = true;
            this.bouncedAt = this.frame;
        }

        // Ignore input right after the actor bounce was resolved
        const ignoreInput = !this.didBounce && this.actor.body.velocity.y <= 0;
        // if (ignoreInput && trigger) {
        //     console.log('Ignore input');
        // }

        if (!ignoreInput && !this.didTrigger && (
            trigger || this.timedOut() // automatically trigger after timeout
        )) {
            this.didTrigger = true;
            this.triggeredAt = this.frame;
        }

        // Once both happened we can resolve the actor's new speed
        if (this.didTrigger && this.didBounce) {
            this.adjustBounce();
            this.killIfNeeded();
            this.reset();
        }
    },

    adjustBounce() {
        const { perfect, good, poor } = this.timings;
        const distance = Math.abs(this.bouncedAt - this.triggeredAt);

        let multiplier;
        if (distance <= perfect) {
            multiplier = 1.2;
        } else if (distance <= good) {
            multiplier = 1;
        } else if (distance <= poor) {
            multiplier = 0.8;
        } else {
            multiplier = 0.5;
        }

        this.actor.body.velocity.y *= multiplier;
    },

    killIfNeeded() {
        const { actor } = this;
        if (Math.abs(actor.body.velocity.y) < 50) {
            actor.kill();
        }
    },
};

module.exports = Bouncer;
