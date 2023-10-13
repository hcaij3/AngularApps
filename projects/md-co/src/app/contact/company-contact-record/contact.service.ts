import { Injectable } from '@angular/core';
import { EntityService } from '../../models/entity.service';
import { ConverterService, ICode } from '@hpfb/sdk/ui';
import { FormGroup } from '@angular/forms';
import { Contact } from '../../models/Enrollment';

const DEFAULT_CONT_REC_ID: number =  -1; // Initialize maxId with a value lower than any possible ID

@Injectable()
export class ContactService {

  constructor(private _entityService: EntityService, private _converterService: ConverterService) {}
    
  public mapContactDetailsFormModelToOutputDataModel(formRecord: FormGroup, lang: string, languageList: ICode[], contactSatusList: ICode[]) : Contact{
    let contactOutputRecord = this._entityService.getEmptyContactModel();
  
    contactOutputRecord.contact_id = formRecord.controls['contactId'].value;
    if (formRecord.controls['status'].value) {
      contactOutputRecord.status = this._converterService.findAndConverCodeToIdTextLabel(contactSatusList, formRecord.controls['status'].value, lang);
      contactOutputRecord.status_text = contactOutputRecord.status._id;
    } else {
      contactOutputRecord.status = null;
    }
    contactOutputRecord.full_name = formRecord.controls['fullName'].value;
    if (formRecord.controls['language'].value) {
      contactOutputRecord.language = this._converterService.findAndConverCodeToIdTextLabel(languageList, formRecord.controls['language'].value, lang);
    } else {
      contactOutputRecord.language = null;
    }
    contactOutputRecord.job_title = formRecord.controls['jobTitle'].value;
    contactOutputRecord.fax_number = formRecord.controls['faxNumber'].value;
    contactOutputRecord.phone_number = formRecord.controls['phoneNumber'].value;
    contactOutputRecord.phone_extension = formRecord.controls['phoneExtension'].value;
    contactOutputRecord.email = formRecord.controls['email'].value;
    contactOutputRecord.RoutingID = formRecord.controls['routingId'].value;
    
    return contactOutputRecord;
  }

  // todo move this to a ListService or UtilsService??
  public getNextId(recordList) {
    let maxId = DEFAULT_CONT_REC_ID; 

    if (recordList && recordList.length !== 0) {

      for (const record of recordList) {
        const id = Number(record.id); // Convert ID to a number

        if (id > maxId) {
          maxId = id;
        }
      }
    }

    return maxId + 1;
  }        

   

        
}
