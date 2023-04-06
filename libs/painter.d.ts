import { Instrument } from "./instrument";
export type IPainterOption = {
    width?: number;
    height?: number;
    immediate?: boolean;
    instrument: Instrument;
};
export declare class Painter {
    canvasEl?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;
    private started;
    private opt;
    constructor(opt: IPainterOption, canvasEl?: HTMLCanvasElement);
    setCanvas(canvasEl?: HTMLCanvasElement): void;
    private _start;
    pause(): void;
    start(): void;
    reset(): void;
    isRunning(): boolean;
}
