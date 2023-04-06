import { EventBus } from "./event";
import { TimeInterpolator } from "./interpolator";

export type IDrawableOption = {
  duration: number;
  interpolator?: TimeInterpolator;
};

export class Drawable<E extends string = any> extends EventBus<E> {
  duration: number;
  interpolator?: TimeInterpolator;

  protected option: IDrawableOption;

  constructor(opt: IDrawableOption) {
    super();
    this.duration = opt.duration || 0;
    this.interpolator = opt.interpolator;
    this.option = { ...opt };
  }

  draw(ctx: CanvasRenderingContext2D, progress: number): any {
    console.log("default draw impl", progress);
  }
}
