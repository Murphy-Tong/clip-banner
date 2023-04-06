import { StageState } from "./instrument";
export class Painter {
    constructor(opt, canvasEl) {
        Object.defineProperty(this, "canvasEl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ctx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "started", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "opt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.opt = Object.assign({}, opt);
        this.setCanvas(canvasEl);
    }
    setCanvas(canvasEl) {
        if (!canvasEl) {
            this.ctx = undefined;
            this.canvasEl = undefined;
            this.started = false;
            return;
        }
        this.canvasEl = canvasEl;
        canvasEl.width = this.opt.width || window.innerWidth;
        canvasEl.height = this.opt.height || window.innerHeight;
        this.ctx = canvasEl.getContext("2d");
        this.ctx.canvasWidth = this.opt.width || window.innerWidth;
        this.ctx.canvasHeight = this.opt.height || window.innerHeight;
        this.opt.instrument.onInitCanvas(this.ctx);
        if (this.opt.immediate) {
            this.start();
        }
    }
    _start() {
        if (!this.ctx) {
            this.started = false;
            return;
        }
        requestAnimationFrame(() => {
            if (!this.ctx || !this.started) {
                this.started = false;
                return;
            }
            if (this.opt.instrument.update(this.ctx) === StageState.RUNNING) {
                this._start();
            }
        });
    }
    pause() {
        this.started = false;
    }
    start() {
        if (this.started) {
            return;
        }
        this.started = true;
        this._start();
    }
    reset() {
        this.opt.instrument.reset();
        if (!this.started && this.ctx) {
            this.opt.instrument.update(this.ctx);
        }
    }
    isRunning() {
        return this.started;
    }
}
