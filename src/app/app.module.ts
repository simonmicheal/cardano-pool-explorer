import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExplorerService } from './api/services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationService } from './services/configuration.service';
import { NgbPaginationModule, NgbModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';


//Load config file
export function initConfig(configService: ConfigurationService) {
  return () => configService.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgbPaginationModule,
    NgbAccordionModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ExplorerService, {
    provide: APP_INITIALIZER,
    deps: [ConfigurationService],
    multi: true,
    useFactory: initConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
