import { Instrument, StageState } from "./instrument";

export type IPainterOption = {
  width?: number;
  height?: number;
  immediate?: boolean;
  instrument: Instrument;
};
export class Painter {
  canvasEl?: HTMLCanvasElement;
  ctx?: CanvasRenderingContext2D;
  private started = false;
  private opt: IPainterOption;
  constructor(opt: IPainterOption, canvasEl?: HTMLCanvasElement) {
    this.opt = { ...opt };
    this.setCanvas(canvasEl);
  }

  setCanvas(canvasEl?: HTMLCanvasElement) {
    if (!canvasEl) {
      this.ctx = undefined;
      this.canvasEl = undefined;
      this.started = false;
      return;
    }
    this.canvasEl = canvasEl;
    canvasEl.width = this.opt.width || window.innerWidth;
    canvasEl.height = this.opt.height || window.innerHeight;
    this.ctx = canvasEl.getContext("2d")!;
    this.ctx.canvasWidth = this.opt.width || window.innerWidth;
    this.ctx.canvasHeight = this.opt.height || window.innerHeight;
    this.opt.instrument.onInitCanvas(this.ctx);
    if (this.opt.immediate) {
      this.start();
    }
  }

  private _start() {
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

  public pause() {
    this.started = false;
  }

  public start() {
    if (this.started) {
      return;
    }
    this.started = true;
    this._start();
  }

  public reset() {
    this.opt.instrument.reset();
    if (!this.started && this.ctx) {
      this.opt.instrument.update(this.ctx);
    }
  }

  public isRunning() {
    return this.started;
  }
}
