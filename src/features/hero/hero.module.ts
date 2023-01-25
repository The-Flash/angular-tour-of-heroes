import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HeroSearchModule } from "../hero-search/hero-search.module";
import { MessagesModule } from "../messages/messages.module";
import { HeroDetailComponent } from "./components/hero-detail/hero-detail.component";
import { HeroesComponent } from "./components/heroes/heroes.component";
import { HeroRoutingModule } from "./hero-routing.module";
import { HeroAvatarComponent } from './components/hero-avatar/hero-avatar.component';

import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
@NgModule({
    declarations: [
        HeroDetailComponent,
        HeroesComponent,
        HeroAvatarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MessagesModule,
        HeroSearchModule,
        HeroRoutingModule,
        MatButtonModule,
        MatInputModule
    ],
    exports: [
        HeroDetailComponent,
        HeroesComponent
    ],
})
export class HeroModule { }