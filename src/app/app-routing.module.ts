import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from 'src/features/dashboard/components/dashboard.component';

const routes: Routes = [
  { path: "", component: DashboardComponent },
  {
    path: "heroes",
    loadChildren: () => import("../features/hero/hero.module").then(m => m.HeroModule,),
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
