import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBaseComponent } from './form-base/form-base.component';
import { InformationModule } from './information/information.module';
import { CommonFormDendencyModule, UiModule } from '@hpfb/sdk/ui';
import { CompanyDataLoaderService } from './form-base/company-data-loader.service';
import { CompanyBaseService } from './form-base/company-base.service';
import { CompanyInfoService } from './company-info/company.info.service';
import { CompanyInfoComponent } from './company-info/company.info.component';
import { CompanyContactRecordComponent } from './contact/company-contact-record/company-contact-record.component';
import { ContactDetailsComponent } from './contact/contact.details/contact.details.component';
import { ContactListComponent } from './contact/contact.list/contact.list.component';
import { EntityService } from './models/entity.service';
import { ContactService } from './contact/company-contact-record/contact.service';

@NgModule({
  declarations: [FormBaseComponent, CompanyInfoComponent,
    CompanyContactRecordComponent,
    ContactDetailsComponent,
    ContactListComponent
  ],
  imports: [
    CommonModule,
    InformationModule,
    UiModule,
    CommonFormDendencyModule
  ],
  providers:[CompanyDataLoaderService, CompanyBaseService, CompanyInfoService, EntityService, ContactService],
  exports: [FormBaseComponent, InformationModule,
    CompanyContactRecordComponent,
    ContactDetailsComponent,
    ContactListComponent
  ],
})
export class AppFormModule { } 
