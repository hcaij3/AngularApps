import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import { ValidationService } from '../app/validation.service';
// import { GlobalsService } from '../app/globals/globals.service';
// import { NumbersOnlyModule } from '../app/number-only/number-only.module';
// import { ContainerModule } from './container/container.module';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { PipesModule } from './pipes.module';
import { DirectivesModule } from './directives.module';
import { DataService } from 'projects/common/src/app/data.service';
import { UserModule } from 'projects/common/src/app/user/user.module';

// import {CommonFeatureModule} from '../app/common/common-feature.module';
// import {DataLoaderModule} from '../app/data-loader/data-loader.module';
// import {MasterFileDataLoaderService} from '../app/data-loader/master-file-data-loader.service';
// import { NoCacheHeadersInterceptor } from '../cache.interceptor';

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    PipesModule,
    DirectivesModule,
    UserModule,
    // CommonFeatureModule,
    // DataLoaderModule,
    // NumbersOnlyModule,
    // ContainerModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    // ValidationService,
    DataService,
    // MasterFileDataLoaderService,
    Title,
    // { provide: HTTP_INTERCEPTORS, useClass: NoCacheHeadersInterceptor, multi: true }
  ],
  // exports: [NumbersOnlyModule, TranslateModule, ContainerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
