import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationService } from './services/configuration.service';
import { NgbPaginationModule, NgbAccordionModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from './components/modal.component';
import { GraphQLModule } from './graphql.module';

//Load config file
export function initConfig(configService: ConfigurationService) {
  return () => configService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    NgbdModalContent
  ],
  imports: [
    NgbPaginationModule,
    NgbAccordionModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModalModule,
    GraphQLModule
  ],
  exports: [NgbdModalContent],
  providers: [{
    provide: APP_INITIALIZER,
    deps: [ConfigurationService],
    multi: true,
    useFactory: initConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
