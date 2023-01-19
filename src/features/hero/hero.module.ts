import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HeroSearchModule } from "../hero-search/hero-search.module";
import { MessagesModule } from "../messages/messages.module";
import { HeroDetailComponent } from "./components/hero-detail/hero-detail.component";
import { HeroesComponent } from "./components/heroes/heroes.component";
import { HeroRoutingModule } from "./hero-routing.module";

@NgModule({
    declarations: [
        HeroDetailComponent,
        HeroesComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MessagesModule,
        HeroSearchModule,
        HeroRoutingModule,
    ],
    exports: [
        HeroDetailComponent,
        HeroesComponent
    ],
})
export class HeroModule { }