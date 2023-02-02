import { HeroState } from "./heroes/hero.reducer";
import { MessageState } from "./messages/message.reducer";

export interface AppState {
    hero: HeroState;
    messages: MessageState
}