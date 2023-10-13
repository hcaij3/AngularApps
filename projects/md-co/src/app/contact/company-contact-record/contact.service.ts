import { Injectable } from '@angular/core';
import { EntityService } from '../../models/entity.service';
import { ConverterService, ICode } from '@hpfb/sdk/ui';
import { FormGroup } from '@angular/forms';
import { Contact } from '../../models/Enrollment';


@Injectable()
export class ContactService {

    constructor(private _entityService: EntityService, private _converterService: ConverterService) {}
    
    public mapContactDetailsFormModelToOutputDataModel(formRecord: FormGroup, lang: string, languageList: ICode[], contactSatusList: ICode[]) : Contact{
      let contactModel = this._entityService.getEmptyContactModel();
    
      contactModel.contact_id = formRecord.controls['contactId'].value;
      if (formRecord.controls['status'].value) {
        contactModel.status = this._converterService.findAndConverCodeToIdTextLabel(contactSatusList, formRecord.controls['status'].value, lang);
        // contactModel.status_text = statList[recordIndex].text;   //todo is this necessary
      } else {
        contactModel.status = null;
      }
      contactModel.full_name = formRecord.controls['fullName'].value;
      if (formRecord.controls['language'].value) {
        contactModel.language = this._converterService.findAndConverCodeToIdTextLabel(languageList, formRecord.controls['language'].value, lang);
      } else {
        contactModel.language = null;
      }
      contactModel.job_title = formRecord.controls['jobTitle'].value;
      contactModel.fax_number = formRecord.controls['faxNumber'].value;
      contactModel.phone_number = formRecord.controls['phoneNumber'].value;
      contactModel.phone_extension = formRecord.controls['phoneExtension'].value;
      contactModel.email = formRecord.controls['email'].value;
      contactModel.RoutingID = formRecord.controls['routingId'].value;
      
      return contactModel;
    }

    // todo move this to a ListService or UtilsService??
    public getNextId(recordList) {
      let maxId = -1; // Initialize maxId with a value lower than any possible ID
  
      if (recordList && recordList.length !== 0) {
  
        for (const record of recordList) {
          const id = parseInt(record.id, 10); // Convert ID to a number
  
          if (id > maxId) {
            maxId = id;
          }
        }
      }
  
      return maxId + 1;
    }      

        
}
