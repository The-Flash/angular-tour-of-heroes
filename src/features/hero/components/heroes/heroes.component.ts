import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/features/shared/@types';
import { Observable } from 'rxjs';
import { Store, Select } from "@ngxs/store";
import { Message } from 'src/app/state/messages/message.actions';
import { Heroes } from 'src/app/state/heroes/hero.action';
import { HeroState } from 'src/app/state/heroes/hero.state';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  selectedHero?: Hero;
  newHero?= null;

  @Select(HeroState.heroes) heroes$!: Observable<Hero[]>;


  constructor(
    private store: Store
  ) { }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.store.dispatch(new Message.Add(
      `HeroesComponent: Selected hero id=${hero.id}`
    ));
  }

  ngOnInit(): void {
    this.store.dispatch(new Heroes.LoadAll());
  }

  add(name: string): void {
    name = name.trim();
    if (!name) return;
    this.store.dispatch(new Heroes.Add({ name }));
  }

  delete(hero: Hero): void {
    this.store.dispatch(new Heroes.Delete(hero.id));
  }
}
