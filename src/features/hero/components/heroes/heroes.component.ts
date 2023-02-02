import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/features/shared/@types';
import { IHeroService } from 'src/features/shared/services/hero.service';
import { IMessageService } from 'src/features/shared/services/message.service';
import { Store } from '@ngrx/store';
import { addHero, deleteHero, loadHeroes } from 'src/app/state/heroes/hero.actions';
import { selectAllHeroes } from 'src/app/state/heroes/hero.selectors';
import { addMessage } from 'src/app/state/messages/message.actions';

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
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadHeroes());
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.store.dispatch(addMessage({
      message: `HeroesComponent: Selected hero id=${hero.id}`
    }));
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
    this.store.dispatch(addMessage({
      message: `HeroesComponent: Added hero name=${name}`
    }));
  }

  delete(hero: Hero): void {
    this.store.dispatch(deleteHero({
      id: hero.id
    }));
    this.store.dispatch(addMessage({
      message: `HeroesComponent: Deleted hero name=${hero.name}`
    }));
  }
}
