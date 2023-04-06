import { Instrument } from "./instrument";
import { Drawable } from "./drawable";
export type ImageInstrumentOptions = {
    img: string;
    enterTime: number;
    showTime: number;
    initIndex?: number;
};
export declare class ImageInstrument extends Instrument<ImageInstrumentOptions> {
    imageEl?: HTMLImageElement;
    constructor(opt: ImageInstrumentOptions);
    protected onCreated(): void;
    setImageEl(el: HTMLImageElement): void;
}
export declare function drawImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement): void;
export declare class ImageShowStage extends Drawable {
    protected imageEl?: HTMLImageElement;
    protected scale: number;
    protected transY: number;
    draw(ctx: CanvasRenderingContext2D, progress: number): void;
}
export declare class ImageEnterStage extends Drawable {
    protected radius: number;
    protected imageEl?: HTMLImageElement;
    onPreDraw(ctx: CanvasRenderingContext2D): void;
    draw(ctx: CanvasRenderingContext2D, progress: number): void;
}
