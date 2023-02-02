import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearMessages } from 'src/app/state/messages/message.actions';
import { selectAllMessages } from 'src/app/state/messages/message.selectors';
import { IMessageService } from 'src/features/shared/services/message.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent {
  messages$ = this.store.select(selectAllMessages);

  constructor(
    public messageService: IMessageService,
    private store: Store,
  ) { }

  clear() {
    this.store.dispatch(clearMessages());
  }
}
