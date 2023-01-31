import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { Hero } from "src/features/shared/@types";
import { IHeroService } from "src/features/shared/services/hero.service";
import { DashboardComponent } from "./dashboard.component";
import { HEROES } from "src/features/shared/mocks/mock-heroes";
import { MatChipsModule, MatChipOption } from "@angular/material/chips";
import { BrowserModule, By } from "@angular/platform-browser";
import { HeroSearchModule } from "src/features/hero-search/hero-search.module";
import { HttpClientModule } from "@angular/common/http";
import { HeroServiceTestDouble } from "src/features/shared/test_doubles/HeroServiceTestDouble";


describe("DashboardComponent", () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            imports: [
                BrowserModule,
                HeroSearchModule,
                HttpClientModule,
                // UI
                MatChipsModule,
            ],
            providers: [{
                provide: IHeroService,
                useClass: HeroServiceTestDouble
            }],

        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    // afterEach(() => {
    //     component = null;
    //     fixture = null;
    // })

    it("should create", () => {
        expect(component).toBeTruthy();
    })

    it("should return four heroes for getHeroes", () => {
        expect(component.heroes.length).toEqual(4);
    })

    it("checks that heroes are rendered", () => {
        const matOptionComponents = fixture.debugElement.queryAll(By.directive(MatChipOption));
        expect(matOptionComponents.length).toEqual(4);
    })
})