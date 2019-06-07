import { LinkedQueue, LinkedNode } from "../datastruct/LinkedQueue";

export class EventHandler extends LinkedNode {
    private eventName: string;
    private callback: (data?: any) => void;

    constructor(eventName: string, callback: (data?: any) => void, triggerOnce: boolean) {
        super();
        this.eventName = eventName;
        if (triggerOnce) {
            this.callback = (() => {
                callback();
                eventService.unsubscribe(this);
            });
        } else {
            this.callback = callback;
        }
    }

    public getEventName(): string { return this.eventName; }
    public getCallback(): Function { return this.callback; }

}

class EventService {

    private handlers: {[index: string]: LinkedQueue<EventHandler>};

    constructor() {
        this.handlers = {};
    }

    publish(eventName: string, data?: any) {
        let chain = this.handlers[eventName];
        if (chain) {
            chain.forEach(
                (handler) => handler.getCallback()(data));
        }
    }

    subscribe(eventName: string, callback: (data?: any) => void, triggerOnce?: boolean): EventHandler {
        let handler = new EventHandler(eventName, callback, triggerOnce);

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
        return false;
    }

}

const eventService = new EventService();

export default eventService;
