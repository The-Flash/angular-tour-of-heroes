import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from "./heroes/heroes.component";

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "heroes", component: HeroesComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
