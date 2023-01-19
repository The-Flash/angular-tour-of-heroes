import { Injectable } from '@angular/core';

export abstract class IMessageService {
  messages: string[] = [];
  public abstract add(message: string): void;
  public abstract clear(): void;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService implements IMessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
