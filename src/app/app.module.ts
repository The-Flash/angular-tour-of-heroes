import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";

import { MessagesModule } from "src/features/messages/messages.module";
import { InMemoryDataService } from "src/features/shared/services/in-memory-data.service";
import { DashboardComponent } from "src/features/dashboard/components/dashboard.component";
import { HeroSearchModule } from "src/features/hero-search/hero-search.module";
import { IMessageService, MessageService } from "src/features/shared/services/message.service";
import { HeroService, IHeroService } from "src/features/shared/services/hero.service";
import { HeroModule } from "src/features/hero/hero.module";

import { MatChipsModule } from "@angular/material/chips";
import { AvatarGeneratorService, IAvatarGenerateService } from "src/features/shared/services/avatar-generator.service";
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MessagesModule,
    HeroSearchModule,
    HeroModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),

    // UI
    MatChipsModule,
  ],
  providers: [{
    provide: IMessageService,
    useClass: MessageService,
  }, {
    provide: IHeroService,
    useClass: HeroService,
  }, {
    provide: IAvatarGenerateService,
    useClass: AvatarGeneratorService,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
