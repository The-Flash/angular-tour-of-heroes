import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";

import { MessagesModule } from "src/features/messages/messages.module";
import { HeroesComponent } from "src/features/heroes/components/heroes.component";
import { HeroDetailComponent } from "src/features/hero-detail/components/hero-detail.component";
import { InMemoryDataService } from "src/features/shared/services/in-memory-data.service";
import { DashboardComponent } from "src/features/dashboard/components/dashboard.component";
import { HeroSearchModule } from "src/features/hero-search/hero-search.module";
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MessagesModule,
    HeroSearchModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
