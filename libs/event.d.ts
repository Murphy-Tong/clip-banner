export type IEventCallback<T = any> = (data?: T) => void;
export declare class EventBus<E extends string> {
    map: Record<string, IEventCallback[]>;
    on(event: E, cb: IEventCallback): void;
    off(event: string, cb: IEventCallback): void;
    emit(event: E, ...data: any): void;
}
