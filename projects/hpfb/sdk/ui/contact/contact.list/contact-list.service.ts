import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {CompanyContactRecordService} from '../company-contact-record/company-contact-record.service';
import {ContactDetailsService} from '../contact.details/contact.details.service';
import { RecordListServiceInterface } from '../../record-list/record.list.service.interface';
import { RecordListBaseService } from '../../record-list/record.list.base.service';
import { ICode } from '../../data-loader/data';
import { Contact } from '../../model/entity-base';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ContactListService extends RecordListBaseService implements RecordListServiceInterface {

  /***
   *  The data list of contact records
   * @type {{id: number; contact: string; city: string; country: {id: string; text: string}}[]}
   */
  private contactList = [];

  // to facilitate to subscribe to contactModel's changes
  private contactModelSubject: Subject<any> = new Subject<any>();
  contactModelChanges$: Observable<any> = this.contactModelSubject.asObservable();

  notifyContactModelChanges(changes: any) {
    this.contactModelSubject.next(changes);
  }

  constructor(private _recordService: CompanyContactRecordService) {
    super();
    this.contactList = [];
    this.initIndex(this.contactList);
  }

  /**
   * Gets the array of  model records
   * @returns {{id: number; contact: string; city: string; country: {id: string; text: string}}[]}
   */
  public getModelRecordList() {
    return this.contactList;
  }

  /**
   * Sets the data model. Converts the data model to the form model
   * @param value
   */
  public setModelRecordList(value) {
    this.contactList = value;
  }

  // /**
  //  * Adds
  //  * @param record
  //  */
  // addContact(record) {
  //   // TODO error checking
  //   this.contactList.push(record);
  // }

  getEmptyContactModel() {
    return this._recordService.getEmptyModel();
  }

  public getReactiveModel(fb: FormBuilder): FormGroup {
    return fb.group({
      contacts: fb.array([])
    });
  }

  // getContactFormRecord(fb: FormBuilder, isInternal) {
  //
  //   return this._recordService.getReactiveModel(fb, isInternal);
  // }


  private contactFormToData(record: FormGroup, contactModel: Contact, lang: string, languageList: ICode[], contactSatusList: ICode[]) {
    this._recordService.mapFormModelToDataModel(record, contactModel, lang, languageList, contactSatusList );
  }

  public createFormDataList(modelDataList, fb: FormBuilder, theList, isInternal) {
    for (let i = 0; i < modelDataList.length; i++) {
      const formRecord = this._recordService.getReactiveModel(fb, isInternal);
      this.contactDataToForm(modelDataList[i], formRecord);
      theList.push(formRecord);
    }
  }

  private contactDataToForm(contactModel, record: FormGroup) {
    this._recordService.mapDataModelFormModel(contactModel, record);
    return (record);
  }

  public saveRecord(formRecord: FormGroup, lang:string, languageList: ICode[], contactSatusList: ICode[]) {
    let modelList = this.getModelRecordList();
    let id:number;

    if (formRecord.controls['isNew'].value) {
      // this.setRecordId(formRecord, this.getNextIndex());
      formRecord.controls['isNew'].setValue(false);
      let contactModel = this.getEmptyContactModel();
      this.contactFormToData(formRecord, contactModel, lang, languageList, contactSatusList);
      modelList.push(contactModel);
      id= contactModel.id;

    } else {
      let modelRecord = this.getModelRecord(formRecord.controls['id'].value);
      if (!modelRecord) {
        modelRecord = this.getEmptyContactModel();
      }
      this.contactFormToData(formRecord, modelRecord, lang, languageList, contactSatusList);
      id = modelRecord.id;
    }

    this.notifyContactModelChanges({ ...modelList });
    return id;
  }

  public getModelRecord(id: number) {
    let modelList = this.getModelRecordList();

    for (let i = 0; i < modelList.length; i++) {
      if (Number(modelList[i].id) === id) {
        return modelList[i];
      }
    }
    return null;
  }

  deleteModelRecord(id): boolean {
    let modelList = this.getModelRecordList();

    for (let i = 0; i < modelList.length; i++) {
      if (Number(modelList[i].id) === id) {
        modelList.splice(i, 1);
        if (id === this.getCurrentIndex()) {
          this.setIndex(id - 1);
        }

        this.notifyContactModelChanges({ ...modelList });

        return true;
      }
    }
    return false;
  }

  public getRecordId(record: FormGroup) {
    return ContactDetailsService.getRecordId(record);
  }

  public setRecordId(record: FormGroup, value: number): void {
    ContactDetailsService.setRecordId(record, value);
  }


}
