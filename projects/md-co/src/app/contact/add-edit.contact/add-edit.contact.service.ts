import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UtilsService, ValidationService, ENGLISH, ICode, ConverterService} from '@hpfb/sdk/ui';
import { EntityService } from '../../models/entity.service';
import { Contact } from '../../models/Enrollment';

@Injectable()
export class AddEditContactService {

  constructor(private fb: FormBuilder, private _entityService: EntityService, private _converterService: ConverterService) {}

  public getReactiveModel(isInternal) {

    const contactIdValidators = isInternal ? [Validators.required, ValidationService.dossierContactIdValidator] : [];

    return this.fb.group({
      contactId: [null, contactIdValidators],
      status: 'NEW',
      fullName: [null, Validators.required],
      language: '',
      jobTitle: [null, Validators.required],
      faxNumber: ['', [Validators.minLength(10), ValidationService.faxNumberValidator]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), ValidationService.phoneNumberValidator]],
      phoneExtension: '',
      email: [null, [Validators.required, ValidationService.emailValidator]],
      routingId: ''
    });
  }

  public mapFormModelToDataModel(formRecord: FormGroup, lang: string, languageList: ICode[], contactSatusList: ICode[]) : Contact{

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

  public static mapDataModelToFormModel(contactModel, formRecord: FormGroup) {
    formRecord.controls['contactId'].setValue(contactModel.contact_id);
    // if (contactModel.status) {
    //   const recordIndex = ListService.getRecord(this.statusListInternal, contactModel.status._id, 'id');
    //   if (recordIndex > -1) {
    //     formRecord.controls['status'].setValue(this.statusListInternal[recordIndex].id);
    //   }
    // } else {
    //   formRecord.controls['status'].setValue(null);
    // }
    // formRecord.controls.hcStatus.setValue(contactModel.hc_status);
    // if (contactModel.salutation) {
    //   const recordIndex2 = ListService.getRecord(this.salutationList, contactModel.salutation._id, 'id');
    //   if (recordIndex2 > -1) {
    //     formRecord.controls.salutation.setValue(this.salutationList[recordIndex2].id);
    //   }
    // } else {
    //   formRecord.controls.salutation.setValue(null);
    // }

    formRecord.controls['fullName'].setValue(contactModel.full_name);
    // formRecord.controls.initials.setValue(contactModel.initials);
    // formRecord.controls.lastName.setValue(contactModel.last_name);
    if (contactModel.language) {
      // ling todo
      // const recordIndex3 = ListService.getRecord(this.languageList, contactModel.language._id, 'id');
      // if (recordIndex3 > -1) {
      //   formRecord.controls['language'].setValue(this.languageList[recordIndex3].id);
      // }
    } else {
      formRecord.controls['language'].setValue(null);
    }
    formRecord.controls['jobTitle'].setValue(contactModel.job_title);
    formRecord.controls['faxNumber'].setValue(contactModel.fax_number);
    formRecord.controls['phoneNumber'].setValue(contactModel.phone_number);
    formRecord.controls['phoneExtension'].setValue(contactModel.phone_extension);
    formRecord.controls['email'].setValue(contactModel.email);
    formRecord.controls['routingId'].setValue(contactModel.RoutingID);
    // if (contactModel.hc_status) {
    //   const hcs = contactModel.hc_status === GlobalsService.YES ? true : false;
    //   formRecord.controls.recordProcessed.setValue(hcs);
    // }
  }

  public static getRecordId(record: FormGroup) {
    return (record.controls['id'].value);
  }

  public static setRecordId(record: FormGroup, value: number): void {
    if (!record) {
      return;
    }
    record.controls['id'].setValue(value);
  }

  /***
   * Converts the list iteems of id, label_en, and label_Fr
   * @param rawList
   * @param lang
   * @private
   */
  private static _convertListText(rawList, lang) {
    const result = [];
    if (UtilsService.isFrench(lang)) {
      rawList.forEach(item => {
        item.text = item.label_fr;
        result.push(item);
        //  console.log(item);
      });
    } else {
      rawList.forEach(item => {
        item.text = item.label_en;
        // console.log("adding country"+item.text);
        result.push(item);
        // console.log(item);
      });
    }
    return result;
  }

}
