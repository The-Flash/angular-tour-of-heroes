import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Heroes } from 'src/app/state/heroes/hero.action';
import { Hero } from 'src/features/shared/@types';
import { IHeroService } from 'src/features/shared/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ["./hero-detail.component.scss"]
})
export class HeroDetailComponent {
  @Input() hero?: Hero;

  constructor(private store: Store) { }

  save() {
    if (this.hero) {
      this.store.dispatch(new Heroes.Update(this.hero.id, this.hero.name));
    }
  }
}
