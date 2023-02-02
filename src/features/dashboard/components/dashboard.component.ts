import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadHeroes } from 'src/app/state/heroes/hero.actions';
import { selectTopHeroes } from 'src/app/state/heroes/hero.selectors';
import { IHeroService } from 'src/features/shared/services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  heroes$ = this.store.select(selectTopHeroes);

  constructor(
    private heroService: IHeroService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadHeroes());
  }
}
