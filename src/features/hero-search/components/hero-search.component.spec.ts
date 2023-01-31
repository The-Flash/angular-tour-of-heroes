import { HeroSearchComponent } from "./hero-search.component";
import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
    flush,
    discardPeriodicTasks,
} from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HeroService, IHeroService } from "src/features/shared/services/hero.service";
import { HEROES } from "src/features/shared/mocks/mock-heroes";
import { Observable } from "rxjs";
import { Hero } from "src/features/shared/@types";
import { HeroServiceTestDouble } from "src/features/shared/test_doubles/HeroServiceTestDouble";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("HeroSearchComponent", () => {
    let component: HeroSearchComponent | null;
    let fixture: ComponentFixture<HeroSearchComponent> | null;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                HeroSearchComponent
            ],
            imports: [
                CommonModule,
                RouterModule,
                HttpClientTestingModule
            ],
            providers: [{
                provide: IHeroService,
                useClass: HeroService
            }],
            teardown: { destroyAfterEach: false }
        }).compileComponents();
        fixture = TestBed.createComponent(HeroSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    afterEach(() => {
        component = null;
        fixture = null;
    })

    it("should filter based on a search term", async () => {
        let result: Hero[] = [];
        component?.search("M");
        sleepSync(5000);
        component?.heroes$.subscribe(data => {
            console.log("Data", data);
        });
    })
})

function sleepSync(ms: number) {
    const end = new Date().getTime() + ms;
    while (new Date().getTime() < end) { /* do nothing */ }
}
