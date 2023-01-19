import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeroesComponent } from "./components/heroes/heroes.component";

const routes = [
    {
        path: "",
        component: HeroesComponent,
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class HeroRoutingModule {

}