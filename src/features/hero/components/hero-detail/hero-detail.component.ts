import { Component, Input } from '@angular/core';
import { Hero } from 'src/features/shared/@types';
import { IHeroService } from 'src/features/shared/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ["./hero-detail.component.scss"]
})
export class HeroDetailComponent {
  @Input() hero?: Hero;

  constructor(private heroService: IHeroService) { }

  save() {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe();
    }
  }
}
