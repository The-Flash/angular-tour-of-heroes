import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, merge } from 'rxjs';
import { catchError, tap, scan } from "rxjs/operators";
import { MessageService } from 'src/features/shared/services/message.service';
import { CRUDAction, Hero } from '../@types';

export abstract class IHeroService {
  public abstract allHeroes$: Observable<Hero[]>;
  public abstract getHeroes(): Observable<Hero[]>;
  public abstract getHero(id: number): Observable<Hero>;
  public abstract updateHero(hero: Hero): Observable<any>;
  public abstract addHero(hero: Hero): Observable<Hero>;
  public abstract deleteHero(id: number): Observable<Hero>;
  public abstract searchHeroes(term: string): Observable<Hero[]>;
}

@Injectable({
  providedIn: 'root'
})
export class HeroService implements IHeroService {

  private heroesUrl = "api/heroes";

  heroes$ = this.getHeroes();

  private heroCRUDSubject = new Subject<CRUDAction<Hero>>();
  heroCRUDAction = this.heroCRUDSubject.asObservable();

  public allHeroes$: Observable<Hero[]> = merge(
    this.heroes$,
    this.heroCRUDAction
  ).pipe(
    scan(
      (heroes, value) => this.reducer(heroes, value),
      [] as Hero[]
    ),
  );

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private reducer(heroes: Hero[], value: Hero[] | CRUDAction<Hero>) {
    if (!(value instanceof Array)) {
      if (value.action === "add") {
        return [...heroes, value.data];
      }
      if (value.action === "delete") {
        return heroes.filter(hero => {
          return hero.id !== value.data.id
        });
      }
    } else {
      return value;
    }
    return heroes;
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log("fetched heroes")),
        catchError(this.handleError<Hero[]>("getHeroes", []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>("updatedHero"))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        tap((newHero: Hero) => {
          this.heroCRUDSubject.next({
            action: "add",
            data: newHero
          })
        }),
        catchError(this.handleError<Hero>("addHero"))
      );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        tap(hero => {
          this.heroCRUDSubject.next({
            action: "delete",
            data: { id: id } as Hero
          });
        }),
        catchError(this.handleError<Hero>("deleteHero"))
      );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    console.log("Hello")
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ? this.log(`found heros matching"${term}"`) : this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>("searchHeroes", []))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
