import { LinkedQueue, LinkedNode } from "../datastruct/LinkedQueue";
import format from 'string-template';

export class EventHandler extends LinkedNode {
    private eventName: string;
    private callback: (data?: any) => void;
    private triggerOnce: boolean;

    constructor(eventName: string, callback: (data?: any) => void, triggerOnce: boolean) {
        super();
        this.eventName = eventName;
        this.triggerOnce = triggerOnce;
        this.callback = callback;
    }

    public getEventName(): string { return this.eventName; }
    public getCallback(): Function { return this.callback; }
    public isTriggerOnce(): boolean { return this.triggerOnce; }
    public toString(): string {
        return format('EventHandler[eventName: {0}, triggerOnce: {1}]',
            { 0: this.eventName, 1: this.triggerOnce })
    }

}

class EventService {

    private handlers: {[index: string]: LinkedQueue<EventHandler>};

    constructor() {
        this.handlers = {};
    }

    publish(eventName: string, data?: any) {
        let chain = this.handlers[eventName];
        if (chain) {
            let unsubscribeNeeded: EventHandler[] = [];
            chain.forEach((handler) => {
                handler.getCallback()(data);
                if (handler.isTriggerOnce()) {
                    unsubscribeNeeded.push(handler);
                }
            });
            unsubscribeNeeded.forEach((handler) => eventService.unsubscribe(handler));
        }
    }

    subscribe(eventName: string, callback: (data?: any) => void, triggerOnce?: boolean): EventHandler {
        let handler = new EventHandler(eventName, callback, triggerOnce || false);

        let chain = this.handlers[eventName];
        if (!chain) {
            chain = this.handlers[eventName] = new LinkedQueue<EventHandler>();
        }
        chain.enQueue(handler);
        return handler;
    }

    unsubscribe(handler: EventHandler): boolean {
        let chain = this.handlers[handler.getEventName()];
        if (chain) {
            chain.delete(handler.getIndex());
            return true;
        }
        // chain.printQueue();
        return false;
    }

}

const eventService = new EventService();

export default eventService;
