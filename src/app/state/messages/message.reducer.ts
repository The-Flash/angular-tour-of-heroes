import { createReducer, on } from "@ngrx/store";
import { addMessage, clearMessages } from "./message.actions";

export interface MessageState {
    messages: string[];
}

const initialState: MessageState = {
    messages: []
}

export const messageReducer = createReducer(
    initialState,
    on(
        addMessage,
        (state, { message }) => ({
            ...state,
            messages: [message, ...state.messages]
        })
    ),
    on(clearMessages, (state) => ({
        ...state,
        messages: []
    }))
);