import { Component } from '@angular/core';
import { Store, Select } from "@ngxs/store";
import { MessageState } from 'src/app/state/messages/message.state';
import { Observable } from "rxjs";
import { Message } from 'src/app/state/messages/message.actions';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent {
  @Select(MessageState.messages) messages$!: Observable<string[]>;

  constructor(private store: Store) { }

  clear() {
    this.store.dispatch(new Message.Clear());
  }
}
