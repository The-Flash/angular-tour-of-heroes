import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeroSearchComponent } from "./components/hero-search.component";

@NgModule({
    declarations: [
        HeroSearchComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        HeroSearchComponent
    ]
})
export class HeroSearchModule { }