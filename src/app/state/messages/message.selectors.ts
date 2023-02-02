import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MessageState } from "./message.reducer";

export const selectMessageState = createFeatureSelector<Readonly<MessageState>>("messages");

export const selectAllMessages = createSelector(
    selectMessageState,
    (state: MessageState) => state.messages,
);