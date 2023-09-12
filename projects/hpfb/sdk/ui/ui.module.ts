import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpanderComponent } from './expander/expander.component';
import { GreeterComponent } from './file-io/greeter/greeter.component';
import { LayoutComponent } from './layout/layout.component';
import { FileIoModule } from './file-io/file-io.module';
import { UtilsService } from './utils/utils.service';
import { ValidationService } from './validation/validation.service';
import { FormControlPipe } from './public-api';
import { AddressDetailsComponent } from './address/address.details/address.details.component';

@NgModule({
  declarations: [LayoutComponent, AddressDetailsComponent, ExpanderComponent, GreeterComponent, FormControlPipe],
  imports: [CommonModule, FileIoModule],
  providers: [UtilsService, ValidationService],
  exports: [LayoutComponent, AddressDetailsComponent, ExpanderComponent, GreeterComponent, FileIoModule, FormControlPipe],
})
export class UiModule {}
 