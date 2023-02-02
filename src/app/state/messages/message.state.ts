import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { Message } from "./message.actions";

export interface MessageStateModel {
    messages: string[];
}

@State<MessageStateModel>({
    name: "messages",
    defaults: {
        messages: []
    }
})
@Injectable()
export class MessageState {
    @Selector()
    static messages(state: MessageStateModel) {
        return state.messages;
    }

    @Action(Message.Add)
    addMessage(ctx: StateContext<MessageStateModel>, action: Message.Add) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            messages: [action.message, ...state.messages]
        });
    }

    @Action(Message.Clear)
    clearMessages(ctx: StateContext<MessageStateModel>) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            messages: []
        });
    }
}