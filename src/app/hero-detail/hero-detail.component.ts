import { Component, Input } from '@angular/core';
import { Hero } from "../hero";
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent {
  @Input() hero?: Hero;

  constructor(private heroService: HeroService) { }

  save() {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe();
    }
  }
}
