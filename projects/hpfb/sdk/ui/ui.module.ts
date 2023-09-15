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

@NgModule({
  declarations: [
    LayoutComponent,
    ExpanderComponent,
    ControlMessagesComponent,
    ErrorSummaryComponent,
    AddressDetailsComponent,
    GreeterComponent,
    FormControlPipe,
    JsonKeysPipe,
  ],
  imports: [CommonModule, CommonFormDendencyModule, FileIoModule],
  providers: [AddressDetailsService, UtilsService],
  exports: [
    LayoutComponent,
    ExpanderComponent,
    ControlMessagesComponent,
    ErrorSummaryComponent,
    AddressDetailsComponent,
    GreeterComponent,
    FileIoModule,
    FormControlPipe,
    JsonKeysPipe,
  ],
})
export class UiModule {}
