import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonFormDendencyModule } from './common.form.dendency.module';
import { FileIoModule } from './file-io/file-io.module';

import { LayoutComponent } from './layout/layout.component';
import { ExpanderComponent } from './expander/expander.component';
import { ControlMessagesComponent } from './error-msg/control-messages/control-messages.component';
import { ErrorSummaryComponent } from './error-msg/error-summary/error-summary.component';
import { GreeterComponent } from './file-io/greeter/greeter.component';
import { AddressDetailsComponent } from './address/address.details/address.details.component';
import { AddressDetailsService } from './address/address.details/address.details.service';
import { UtilsService } from './utils/utils.service';
import { FormControlPipe } from './pipes/form-control.pipe';
import { JsonKeysPipe } from './pipes/json-keys.pipe';
import { AriaTransformPipe } from './pipes/aria-transform.pipe';
import { TextTransformPipe } from './pipes/text-transform.pipe';
import { CompanyContactRecordComponent } from './contact/company-contact-record/company-contact-record.component';
import { ContactDetailsComponent } from './contact/contact.details/contact.details.component';
import { ContactListComponent } from './contact/contact.list/contact.list.component';
import { VersionService } from './version/version.service';
import { NoCacheHeadersInterceptor } from './interceptor/cache.interceptor';
import { FileConversionService } from './file-io/file-conversion.service';
import { PrivacyStatementComponent } from './information/privacy-statement/privacy-statement.component';
import { SecurityDisclaimerComponent } from './information/security-disclaimer/security-disclaimer.component';
import { InstructionService } from './information/instruction/instruction.service';
import { LoggerService } from './logger/logger.service';
import { ConverterService } from './converter/converter.service';
import { EntityBaseService } from './model/entity-base.service';
import { RoutingService } from './routing/routing.service';
import { AddEditContactComponent } from './contact/add-edit.contact/add-edit.contact.component';
import { MinimalLogger } from './minimal-logger.service';
import { AbstractBridgeService, BridgeService } from './bridge.service';

@NgModule({
  declarations: [
    LayoutComponent,
    ExpanderComponent,
    ControlMessagesComponent,
    ErrorSummaryComponent,
    AddressDetailsComponent,
    CompanyContactRecordComponent,
    ContactDetailsComponent,
    ContactListComponent,
    AddEditContactComponent,
    GreeterComponent,
    PrivacyStatementComponent,
    SecurityDisclaimerComponent,
    FormControlPipe,
    JsonKeysPipe,
    AriaTransformPipe,
    TextTransformPipe
  ],
  imports: [
    CommonModule,
    CommonFormDendencyModule,
    FileIoModule
  ],
  providers: [RoutingService, AddressDetailsService, FileConversionService, UtilsService, VersionService, NoCacheHeadersInterceptor, InstructionService, 
    LoggerService, ConverterService, EntityBaseService,
    { provide: MinimalLogger, useExisting: LoggerService },
    // { provide: AbstractBridgeService, useClass: BridgeService },
    ],
  exports: [
    LayoutComponent,
    ExpanderComponent,
    ControlMessagesComponent,
    ErrorSummaryComponent,
    AddressDetailsComponent,
    CompanyContactRecordComponent,
    ContactDetailsComponent,
    ContactListComponent,
    AddEditContactComponent,
    GreeterComponent,
    PrivacyStatementComponent,
    SecurityDisclaimerComponent,
    FileIoModule,
    FormControlPipe,
    JsonKeysPipe,
    AriaTransformPipe,
    TextTransformPipe
  ],
})
export class UiModule {}
 