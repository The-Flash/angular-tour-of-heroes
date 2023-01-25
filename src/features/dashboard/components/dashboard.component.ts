import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/features/shared/@types';
import { IHeroService } from 'src/features/shared/services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: IHeroService) {}

  ngOnInit(): void {
      this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5))
  }
}
