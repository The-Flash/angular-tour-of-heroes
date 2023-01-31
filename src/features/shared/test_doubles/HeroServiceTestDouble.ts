import { Observable, of } from "rxjs";
import { Hero } from "../@types";
import { HEROES } from "../mocks/mock-heroes";
import { IHeroService } from "../services/hero.service";

export class HeroServiceTestDouble implements IHeroService {
    public allHeroes$: Observable<Hero[]> = of(HEROES);
    public getHeroes(): Observable<Hero[]> {
        return of(HEROES);
    }
    public getHero(id: number): Observable<Hero> {
        throw new Error("Method not implemented.");
    }
    public updateHero(hero: Hero): Observable<any> {
        throw new Error("Method not implemented.");
    }
    public addHero(hero: Hero): Observable<Hero> {
        throw new Error("Method not implemented.");
    }
    public deleteHero(id: number): Observable<Hero> {
        throw new Error("Method not implemented.");
    }
    public searchHeroes(term: string): Observable<Hero[]> {
        throw new Error("Method not implemented.");
    }

}