export class EventBus {
    constructor() {
        Object.defineProperty(this, "map", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
    }
    on(event, cb) {
        this.map[event] = this.map[event] || [];
        this.map[event].push(cb);
    }
    off(event, cb) {
        const index = this.map[event].indexOf(cb);
        if (index >= 0) {
            this.map[event].splice(index, 1);
        }
    }
    emit(event, ...data) {
        var _a;
        (_a = this.map[event]) === null || _a === void 0 ? void 0 : _a.forEach((cb) => {
            cb(...data);
        });
    }
}
