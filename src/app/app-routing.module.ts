import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from 'src/features/dashboard/components/dashboard.component';
import { HeroesComponent } from 'src/features/heroes/components/heroes.component';

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
