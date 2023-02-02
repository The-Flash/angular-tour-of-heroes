import { createReducer, on } from "@ngrx/store";
import { Hero } from "src/features/shared/@types";
import { addHeroSuccess, deleteHero, loadHeroes, loadHeroesFailure, loadHeroesSuccess } from "./hero.actions";

export interface HeroState {
    heroes: Hero[];
    error?: string | null;
    status: "pending" | "loading" | "error" | "success",
    topHeroes: Hero[];
}

const initialState: HeroState = {
    heroes: [],
    error: null,
    status: "pending",
    topHeroes: []
}

export const heroReducer = createReducer(
    initialState,
    on(loadHeroes, (state) => state),
    on(loadHeroesSuccess, (state, { heroes }) => ({
        ...state,
        status: "success",
        heroes,
        topHeroes: heroes.slice(1, 5)
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