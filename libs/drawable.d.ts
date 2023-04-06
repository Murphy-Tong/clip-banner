import { EventBus } from "./event";
import { TimeInterpolator } from "./interpolator";
export type IDrawableOption = {
    duration: number;
    interpolator?: TimeInterpolator;
};
export declare class Drawable<E extends string = any> extends EventBus<E> {
    duration: number;
    interpolator?: TimeInterpolator;
    protected option: IDrawableOption;
    constructor(opt: IDrawableOption);
    draw(ctx: CanvasRenderingContext2D, progress: number): any;
}
