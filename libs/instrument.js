import { Drawable } from "./drawable";
export var StageState;
(function (StageState) {
    StageState[StageState["IDEL"] = 0] = "IDEL";
    StageState[StageState["RUNNING"] = 1] = "RUNNING";
    StageState[StageState["FINISH"] = 3] = "FINISH";
})(StageState || (StageState = {}));
export class Instrument extends Drawable {
    constructor(opt) {
        // @ts-ignore
        super({});
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: StageState.IDEL
        });
        Object.defineProperty(this, "progress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "timeStopGap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 100
        });
        Object.defineProperty(this, "lastDrawTime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "currentIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "opt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.interpolator = opt.interpolator;
        this.currentIndex = Math.max(opt.initIndex || 0, 0);
        this.opt = Object.assign({}, opt);
        this.emit("onCreated", this);
        this.opt.stages.forEach((s) => {
            if (s instanceof Instrument) {
                s.opt.clearFlag = false;
            }
        });
        this.onCreated();
    }
    onCreated() { }
    onFinish() { }
    onReset() { }
    onStop() { }
    onDestory() { }
    onInitCanvas(ctx) {
        this.opt.stages[Math.max(this.opt.initIndex || 0, 0)].draw(ctx, 0);
    }
    isRunning(state = this.state) {
        return state === StageState.RUNNING;
    }
    onStageFinish(ctx, stage) {
        this.progress = 0;
        this.currentIndex++;
        this.lastDrawTime = 0;
    }
    draw(ctx, progress) {
        let currentStage = this.opt.stages[this.currentIndex];
        if (!currentStage) {
            return StageState.FINISH;
        }
        if (this.opt.clearFlag !== false) {
            ctx.clearRect(0, 0, ctx.canvasWidth, ctx.canvasHeight);
        }
        ctx.save();
        if (this.opt.drawLastStageAsBackground) {
            let lastIndex = this.currentIndex - 1;
            if (lastIndex < 0) {
                lastIndex = this.opt.stages.length - 1;
            }
            let bgStage = this.opt.stages[lastIndex];
            if (bgStage instanceof Instrument) {
                bgStage = bgStage.opt.stages[bgStage.opt.stages.length - 1];
            }
            if (bgStage) {
                bgStage.draw(ctx, 1);
            }
        }
        ctx.restore();
        if (currentStage instanceof Instrument) {
            ctx.save();
            const state = currentStage.draw(ctx, 1);
            ctx.restore();
            if (state === StageState.RUNNING) {
                return state;
            }
            else {
                this.onStageFinish(ctx, currentStage);
            }
        }
        else {
            ctx.save();
            const now = +new Date();
            if (!this.lastDrawTime) {
                this.progress = 0;
            }
            else if (now - this.lastDrawTime > this.timeStopGap) {
                console.log("drop frame");
            }
            else if (currentStage.duration <= 0) {
                this.progress = 1;
            }
            else {
                this.progress += (now - this.lastDrawTime) / currentStage.duration;
                this.progress = Math.min(this.progress, 1);
            }
            this.lastDrawTime = now;
            const interpolator = currentStage.interpolator || this.interpolator;
            currentStage.draw(ctx, interpolator ? interpolator(this.progress) : this.progress);
            ctx.restore();
            this.emit("progress", this.progress, this);
            if (this.progress >= 1) {
                this.onStageFinish(ctx, currentStage);
            }
        }
        if (this.currentIndex >= this.opt.stages.length) {
            return StageState.FINISH;
        }
        return StageState.RUNNING;
    }
    update(ctx) {
        if (this.state === StageState.FINISH) {
            return this.state;
        }
        if (this.state === StageState.IDEL) {
            this.lastDrawTime = +new Date();
        }
        const newState = this.draw(ctx, 0);
        if (newState === StageState.FINISH) {
            if (this.opt.loop) {
                this.onloop();
            }
            else {
                this.updateState(newState);
                this.onFinish();
            }
        }
        else {
            this.updateState(newState);
        }
        return this.state;
    }
    onloop() {
        this.progress = 0;
        this.currentIndex = 0;
        this.state = StageState.RUNNING;
        this.opt.stages.forEach((s) => {
            if (s instanceof Instrument) {
                s.onloop();
            }
        });
    }
    resetState() {
        this.progress = 0;
        this.lastDrawTime = 0;
        this.currentIndex = Math.max(this.opt.initIndex || 0, 0);
    }
    reset() {
        this.resetState();
        this.updateState(StageState.IDEL);
        this.opt.stages.forEach((s) => {
            if (s instanceof Instrument) {
                s.reset();
            }
        });
        this.onReset();
    }
    updateState(state) {
        const stateChange = this.state !== state;
        this.state = state;
        // @ts-ignore
        this.emit(Object.values(StageState)[state], this);
        if (stateChange) {
            this.emit("stateChange", this);
        }
    }
}
