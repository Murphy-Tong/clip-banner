import { EventBus } from "./event";
export class Drawable extends EventBus {
    constructor(opt) {
        super();
        Object.defineProperty(this, "duration", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "interpolator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "option", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.duration = opt.duration || 0;
        this.interpolator = opt.interpolator;
        this.option = Object.assign({}, opt);
    }
    draw(ctx, progress) {
        console.log("default draw impl", progress);
    }
}
