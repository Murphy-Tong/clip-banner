import { TimeInterpolator } from "./interpolator";
import { Drawable } from "./drawable";
export declare enum StageState {
    IDEL = 0,
    RUNNING = 1,
    FINISH = 3
}
export type InstrumentOption = {
    stages: Drawable<any>[];
    interpolator?: TimeInterpolator;
    initIndex?: number;
    drawLastStageAsBackground?: boolean;
    loop?: boolean;
    clearFlag?: boolean;
};
export declare class Instrument<Option extends Record<string, any> = {}> extends Drawable<"onCreated" | "onReset" | "progress" | "stateChange" | keyof typeof StageState> {
    state: StageState;
    progress: number;
    timeStopGap: number;
    private lastDrawTime;
    private currentIndex;
    protected opt: Option & InstrumentOption;
    constructor(opt: Option & InstrumentOption);
    protected onCreated(): void;
    protected onFinish(): void;
    protected onReset(): void;
    protected onStop(): void;
    protected onDestory(): void;
    onInitCanvas(ctx: CanvasRenderingContext2D): void;
    isRunning(state?: StageState): boolean;
    protected onStageFinish(ctx: CanvasRenderingContext2D, stage: Drawable): void;
    draw(ctx: CanvasRenderingContext2D, progress: number): StageState;
    update(ctx: CanvasRenderingContext2D): StageState;
    protected onloop(): void;
    protected resetState(): void;
    reset(): void;
    private updateState;
}
