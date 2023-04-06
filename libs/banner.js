import { Instrument } from "./instrument";
import { DecelerateInterpolator } from "./interpolator";
import { Drawable } from "./drawable";
export class ImageInstrument extends Instrument {
    constructor(opt) {
        super(Object.assign(Object.assign({}, opt), { loop: false, stages: [
                new ImageEnterStage({
                    duration: opt.enterTime,
                    interpolator: DecelerateInterpolator,
                }),
                new ImageShowStage({ duration: opt.showTime }),
            ] }));
        Object.defineProperty(this, "imageEl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    onCreated() {
        super.onCreated();
        const imageEl = new Image();
        const that = this;
        imageEl.onload = function () {
            // @ts-ignore
            that.setImageEl(this);
        };
        imageEl.src = this.opt.img;
    }
    setImageEl(el) {
        this.imageEl = el;
        this.opt.stages.forEach((s) => {
            // @ts-ignore
            s.imageEl = el;
        });
    }
}
export function drawImage(ctx, img) {
    const { canvasHeight, canvasWidth } = ctx;
    const { width, height } = img;
    const scaleH = canvasHeight / height;
    const scaleW = canvasWidth / width;
    const scale = Math.max(scaleH, scaleW);
    const targetW = Math.ceil(width * scale);
    const targetH = Math.ceil(height * scale);
    ctx.save();
    ctx.translate(-(targetW - canvasWidth) / 2, -(targetH - canvasHeight) / 2);
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, targetW, targetH);
    ctx.restore();
}
export class ImageShowStage extends Drawable {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "imageEl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "scale", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1.2
        });
        Object.defineProperty(this, "transY", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: -50
        });
    }
    draw(ctx, progress) {
        if (!this.imageEl) {
            return;
        }
        const scale = (this.scale - 1) * progress + 1;
        ctx.translate(-(ctx.canvasWidth / 2) * (scale - 1), -(ctx.canvasHeight / 2) * (scale - 1) + this.transY * progress);
        ctx.scale(scale, scale);
        drawImage(ctx, this.imageEl);
    }
}
export class ImageEnterStage extends Drawable {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "radius", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "imageEl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    onPreDraw(ctx) {
        this.radius = Math.ceil(Math.sqrt(ctx.canvasWidth * ctx.canvasWidth + ctx.canvasHeight * ctx.canvasHeight));
    }
    draw(ctx, progress) {
        if (!this.imageEl) {
            return;
        }
        if (!this.radius) {
            this.onPreDraw(ctx);
        }
        ctx.beginPath();
        ctx.arc(0, 0, Math.ceil(this.radius * progress), 0, Math.PI * 2, true);
        ctx.clip();
        drawImage(ctx, this.imageEl);
    }
}
