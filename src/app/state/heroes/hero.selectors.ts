import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HeroState } from "./hero.reducer";

export const selectHeroState = createFeatureSelector<
    Readonly<HeroState>
>("hero");

export const selectAllHeroes = createSelector(
    selectHeroState,
    (state: HeroState) => state.heroes
);

export const selectTopHeroes = createSelector(
    selectHeroState,
    (state: HeroState) => state.topHeroes
);