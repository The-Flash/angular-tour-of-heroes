import { Component, OnInit } from '@angular/core';
import { HEROES } from 'src/features/shared/mocks/mock-heroes';
import { Hero } from 'src/features/shared/@types';
import { IHeroService } from 'src/features/shared/services/hero.service';
import { IMessageService } from 'src/features/shared/services/message.service';
import { BehaviorSubject, combineLatest, concat, map, Observable, of, race, Subject, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { addHero, deleteHero, loadHeroes } from 'src/app/state/heroes/hero.actions';
import { selectAllHeroes } from 'src/app/state/heroes/hero.selectors';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  selectedHero?: Hero;
  newHero?= null;

  heroes$ = this.store.select(selectAllHeroes);
  constructor(
    public heroService: IHeroService,
    private messageService: IMessageService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadHeroes());
  }

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
    this.store.dispatch(addHero({
      hero: { name } as Hero
    }));
  }

  delete(hero: Hero): void {
    this.store.dispatch(deleteHero({
      id: hero.id
    }));
  }
}
