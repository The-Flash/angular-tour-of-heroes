import { createReducer, on } from "@ngrx/store";
import { Hero } from "src/features/shared/@types";
import { addHeroSuccess, deleteHero, loadHeroes, loadHeroesFailure, loadHeroesSuccess } from "./hero.actions";

export interface HeroState {
    heroes: Hero[];
    error?: string | null;
    status: "pending" | "loading" | "error" | "success"
}

export const initialState: HeroState = {
    heroes: [],
    error: null,
    status: "pending"
}

export const heroReducer = createReducer(
    initialState,
    on(loadHeroes, (state) => state),
    on(loadHeroesSuccess, (state, { heroes }) => ({
        ...state,
        status: "success",
        heroes,
    })),
    on(loadHeroesFailure, (state, { error }) => ({
        ...state,
        error,
    })),
    on(addHeroSuccess, (state, { hero }) => ({
        ...state,
        heroes: [hero, ...state.heroes]
    })),
    on(deleteHero, (state, { id }) => ({
        ...state,
        heroes: state.heroes.filter((hero) => {
            return hero.id !== id
        }),
    })),
);