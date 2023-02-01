import { createAction, props } from "@ngrx/store";
import { Hero } from "src/features/shared/@types";

export const loadHeroes = createAction("Load Heroes");

export const loadHeroesSuccess = createAction(
    "Hero Load Success",
    props<{ heroes: Hero[] }>()
);

export const loadHeroesFailure = createAction(
    "Hero Load Failure",
    props<{ error: string }>(),
);

export const addHero = createAction(
    "Hero Add",
    props<{ hero: Hero }>(),
);

export const addHeroSuccess = createAction(
    "Hero Add Success",
    props<{ hero: Hero }>(),
);

export const deleteHero = createAction(
    "Hero Delete",
    props<{ id: number }>(),
);