/* eslint-disable no-underscore-dangle,prefer-spread,no-underscore-dangle */

type Handler = Function & { _once ?: boolean }
interface Handlers {
  [index : string] : Array<Handler>
}

export class EventEmitter {
  protected handlers: Handlers

  constructor() {
    this.handlers = {};
  }

  on(eventName : string, handler : Handler) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
  }

  once(eventName: string, handler : Handler) {
    if (!('_once' in handler)) handler._once = true;
    this.on(eventName, handler);
  }

  emit(eventName : string, ...params : any []) {
    if (!this.handlers[eventName]) return;
    const handlers = this.handlers[eventName];
    for (let i = 0; i < handlers.length; i++) {
      const handler = handlers[i];
      handler.apply(null, params);
    }
    this.handlers[eventName] = this.handlers[eventName].filter((handler) => !handler._once);
  }

  remove(eventName : string, handler: Handler) {
    if (!this.handlers[eventName]) return;
    const index = this.handlers[eventName].indexOf(handler);
    if (index === -1) return;
    this.handlers[eventName] = this.handlers[eventName].splice(index, 1);
  }
}
