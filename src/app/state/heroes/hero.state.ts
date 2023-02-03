import { Injectable } from "@angular/core";
import { Hero } from "src/features/shared/@types";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { Heroes } from "./hero.action";
import { HeroService } from "src/features/shared/services/hero.service";
import { catchError, tap } from "rxjs/operators";
import { Message } from "../messages/message.actions";
import { InMemoryDataService } from "src/features/shared/services/in-memory-data.service";

export interface HeroStateModel {
    heroes: Hero[];
}


@State<HeroStateModel>({
    name: "heroes",
    defaults: {
        heroes: []
    }
})
@Injectable()
export class HeroState {
    constructor(
        private heroService: HeroService,
        private inMemoryDataService: InMemoryDataService
    ) { }

    @Selector()
    static heroes(state: HeroStateModel) {
        return state.heroes;
    }

    @Action(Heroes.LoadAll)
    loadHeroes(ctx: StateContext<HeroStateModel>) {
        return this.heroService.getHeroes()
            .pipe(
                tap((heroes) => ctx.dispatch(new Heroes.LoadAllSuccess(heroes))),
                catchError(() => ctx.dispatch(new Heroes.LoadAllFailure()))
            )
    }

    @Action(Heroes.LoadAllSuccess)
    loadHeroesSuccess(ctx: StateContext<HeroStateModel>, action: Heroes.LoadAllSuccess) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            heroes: action.heroes,
        });
    }

    @Action(Heroes.LoadAllFailure)
    loadHeroesFailure(ctx: StateContext<HeroStateModel>) {
        ctx.dispatch(
            new Message.Add("[Hero] an error occurred while loading heroes")
        )
    }

    @Action(Heroes.Add)
    addHero(ctx: StateContext<HeroStateModel>, action: Heroes.Add) {
        const state = ctx.getState();
        const id = this.inMemoryDataService.genId(state.heroes);
        return this.heroService.addHero({
            id,
            name: action.data.name
        }).pipe(
            tap((hero) => ctx.dispatch(new Heroes.AddSuccess(hero))),
            catchError(() => ctx.dispatch(new Heroes.AddFailure())),
        )
    }

    @Action(Heroes.AddSuccess)
    addHeroSuccess(ctx: StateContext<HeroStateModel>, action: Heroes.AddSuccess) {
        const state = ctx.getState()
        ctx.setState({
            ...state,
            heroes: [action.hero, ...state.heroes]
        });
    }

    @Action(Heroes.AddFailure)
    addHeroesFailure(ctx: StateContext<HeroStateModel>) {
        ctx.dispatch(
            new Message.Add("[Hero] an error occurred while adding hero")
        )
    }

    @Action(Heroes.Delete)
    deleteHero(ctx: StateContext<HeroStateModel>, action: Heroes.Delete) {
        return this.heroService.deleteHero(action.id)
            .pipe(
                tap(() => ctx.dispatch(new Heroes.DeleteSuccess(action.id))),
                catchError(() => ctx.dispatch(new Heroes.DeleteFailure()))
            );
    }

    @Action(Heroes.DeleteSuccess)
    deleteHeroSuccess(ctx: StateContext<HeroStateModel>, action: Heroes.DeleteSuccess) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            heroes: state.heroes.filter(hero => hero.id !== action.id),
        });
        ctx.dispatch(new Message.Add("[Hero] Deleted Hero"));
    }

    @Action(Heroes.DeleteFailure)
    deleteHeroFailure(ctx: StateContext<HeroStateModel>) {
        ctx.dispatch(new Message.Add("[Hero] could not delete hero"));
    }

    @Action(Heroes.Update)
    updateHero(ctx: StateContext<HeroStateModel>, action: Heroes.Update) {
        const hero = {
            id: action.id,
            name: action.name
        }
        return this.heroService.updateHero(hero)
                .pipe(
                    tap(() => ctx.dispatch(new Heroes.UpdateSuccess(hero))),
                    catchError(() => ctx.dispatch(new Heroes.UpdateFailure)),
                )
    }

    @Action(Heroes.UpdateSuccess)
    updateHeroSuccess(ctx: StateContext<HeroStateModel>, action: Heroes.UpdateSuccess) {
        const state = ctx.getState();
        const index = state.heroes.findIndex((hero) => hero.id == action.hero.id);
        const heroes = state.heroes;
        heroes.splice(index, 1, action.hero);
        ctx.setState({
            ...state,
            heroes: [...heroes]
        });
        ctx.dispatch(new Message.Add("[Hero] Hero updated"));
    }

    @Action(Heroes.UpdateFailure)
    updateHeroFailure(ctx: StateContext<HeroStateModel>, action: Heroes.UpdateFailure) {
        ctx.dispatch(new Message.Add("[Hero] Hero update failed"));
    }
}