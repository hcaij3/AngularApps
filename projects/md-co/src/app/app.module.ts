import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { AppFormModule } from './app.form.module';
import { AbstractBridgeService, UiModule } from '@hpfb/sdk/ui';
import { ErrorComponent } from './error/error.component';
import { ContainerComponent } from './container/container.component';
import { NoCacheHeadersInterceptor } from '@hpfb/sdk/ui';
import { VersionService } from '@hpfb/sdk/ui/';
import { InstructionService } from '@hpfb/sdk/ui';
import { AppRoutingModule } from './app-routing.module';
import { GlobalService } from './global/global.service';
import { MinimalLogger } from '@hpfb/sdk/ui';
import { DateLoggerService } from './date-logger.service';


@NgModule({
  declarations: [AppComponent, ContainerComponent, ErrorComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    // NumbersOnlyModule,
    UiModule,
    AppFormModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    Title,
    VersionService,
    { provide: HTTP_INTERCEPTORS, useClass: NoCacheHeadersInterceptor, multi: true },
    InstructionService,
    { provide: MinimalLogger, useClass: DateLoggerService },
    { provide: AbstractBridgeService, useClass: GlobalService },

    GlobalService
  ],
  exports: [AppFormModule],
  bootstrap: [AppComponent],
})
export class AppModule {}


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
