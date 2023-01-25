import { Component } from '@angular/core';
import { HEROES } from 'src/features/shared/mocks/mock-heroes';
import { Hero } from 'src/features/shared/@types';
import { IHeroService } from 'src/features/shared/services/hero.service';
import { IMessageService } from 'src/features/shared/services/message.service';
import { BehaviorSubject, combineLatest, concat, map, Observable, of, race, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {

  selectedHero?: Hero;
  newHero?= null;
  newHeroSubject = new BehaviorSubject<Hero | null>(null);
  newHeroSubjectAction = this.newHeroSubject.asObservable();
  deleteHeroSubject = new BehaviorSubject<number | null>(null);
  deleteHeroAction = this.deleteHeroSubject.asObservable();

  // heroes$: Observable<Hero[]> = race([
  //   this.heroService.getHeroes(),
  //   this.newHeroSubjectAction,
  //   this.deleteHeroAction
  // ]).pipe(
  //   map((data) => {
  //     console.log(data);
  //     // if (deletedHeroId) {
  //     //   console.log("Delete Hero", deletedHeroId)
  //     //   return heroes.filter((hero) => {
  //     //     this.deleteHeroSubject.next(null);
  //     //     return hero.id !== deletedHeroId;
  //     //   });
  //     // }
  //     // if (newHero) {
  //     //   heroes.push(newHero);
  //     // }
  //     if(typeof data === "number") {
  //       return 
  //     }
  //     // return heroes;
  //     if(Array.isArray(data)) {
  //       return data;
  //     }
  //     return [];
  //   }),
  // );

  heroes$: Observable<Hero[]> = this.heroService.allHeroes$;
  constructor(public heroService: IHeroService, private messageService: IMessageService) { }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  getHeroes() {
    return this.heroService.allHeroes$;
  }

  add(name: string): void {
    name = name.trim();
    if (!name) return;
    this.heroService.addHero({ name } as Hero)
      .subscribe((hero => {
        this.newHeroSubject.next(hero);
      }));
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id)
      .subscribe(() => {
        this.deleteHeroSubject.next(hero.id);
      })
  }
}
