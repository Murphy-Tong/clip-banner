export type IEventCallback<T = any> = (data?: T) => void;
export class EventBus<E extends string> {
  map: Record<string, IEventCallback[]> = {};
  on(event: E, cb: IEventCallback) {
    this.map[event] = this.map[event] || [];
    this.map[event].push(cb);
  }
  off(event: string, cb: IEventCallback) {
    const index = this.map[event].indexOf(cb);
    if (index >= 0) {
      this.map[event].splice(index, 1);
    }
  }
  emit(event: E, ...data: any) {
    this.map[event]?.forEach((cb) => {
      cb(...data);
    });
  }
}
