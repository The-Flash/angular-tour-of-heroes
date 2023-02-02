import { createAction, props } from "@ngrx/store";

export const addMessage = createAction(
    "Add Message",
    props<{ message: string }>()
);

export const clearMessages = createAction(
    "Clear Messages"
);