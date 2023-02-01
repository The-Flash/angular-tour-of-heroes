import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app_state";
import { HeroService } from "src/features/shared/services/hero.service";
import { addHero, addHeroSuccess, deleteHero, loadHeroes, loadHeroesFailure, loadHeroesSuccess } from "./hero.actions";
import { switchMap, of, from } from "rxjs";
import { map, catchError, withLatestFrom } from "rxjs/operators";
import { selectAllHeroes } from "./hero.selectors";
import { InMemoryDataService } from "src/features/shared/services/in-memory-data.service";

@Injectable()
export class HeroEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private heroService: HeroService,
        private inMemoryDataService: InMemoryDataService,
    ) { }

    loadHeroes$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(loadHeroes),
                switchMap(
                    () => this.heroService.getHeroes()
                        .pipe(
                            map((heroes) => loadHeroesSuccess({ heroes })),
                            catchError(() => of(loadHeroesFailure({ error: "An error occurred" })))
                        )
                )
            )
    }
    );

    addHero$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(addHero),
                withLatestFrom(this.store.select(selectAllHeroes)),
                switchMap(([action, heroes]) => from(this.heroService.addHero({
                    ...action.hero,
                    id: this.inMemoryDataService.genId(heroes),
                }).pipe(
                    map(hero => addHeroSuccess({ hero }))
                ),
                ))
            ),
    );

    deleteHero$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(deleteHero),
                switchMap((action) => {
                    return from(this.heroService.deleteHero(action.id));
                }),
            ),
        { dispatch: false }
    )
}