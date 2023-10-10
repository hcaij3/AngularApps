import {
  Component, Input, Output, OnInit, SimpleChanges, OnChanges, EventEmitter, ViewChildren, QueryList,
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation
} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { ControlMessagesComponent, ICode, ListServiceNew, RoutingService, ValidationService } from '@hpfb/sdk/ui';
import {ContactDetailsService} from './contact.details.service';
import { GlobalService } from '../../global/global.service';
import { AddEditContactService } from '../add-edit.contact/add-edit.contact.service';
import { Contact, Enrollment } from '../../models/Enrollment';


@Component({
  selector: 'contact-details',
  templateUrl: 'contact.details.component.html',
  encapsulation: ViewEncapsulation.None
})

/**
 * Contact Details Component is used for Company form
 */
export class ContactDetailsComponent implements OnInit, OnChanges, AfterViewInit {

  public contactFormLocalModel: FormGroup;
  
  @Input() editable: boolean
  @Input('group') public contactRecord: FormGroup;
  @Input() detailsChanged: number;
  @Input() showErrors: boolean;
  @Input() isInternal: boolean;
  @Input() languageList: ICode[];
  @Input() contactStatusList: ICode[];
  @Input() lang;
  @Input() helpTextSequences;
  

  @Output() errorList = new EventEmitter(true);
  @ViewChildren(ControlMessagesComponent) msgList: QueryList<ControlMessagesComponent>;

  // For the searchable select box, only accepts/saves id and text.
  // Will need to convert

  public showFieldErrors: boolean = false;
  private detailsService: ContactDetailsService;

  constructor(private _fb: FormBuilder, private cdr: ChangeDetectorRef,  private _listService: ListServiceNew, 
    private _addEditContactService: AddEditContactService, private _globalService: GlobalService, private _routingService: RoutingService) {
    this.showFieldErrors = false;
    this.showErrors = false;

    console.log("contact.detail ", this.contactRecord)
  }

  ngOnInit() {
    if (!this.contactFormLocalModel) {
      this.contactFormLocalModel = this._addEditContactService.getReactiveModel(this.isInternal);
    }
    this.detailsChanged = 0;
  }

  ngAfterViewInit() {
    this.msgList.changes.subscribe(errorObjs => {
      // let temp = [];
      this._updateErrorList(errorObjs);

      /* errorObjs.forEach(
         error => {
           temp.push(error);
         }
       );
       this.errorList.emit(temp);*/
    });
    this.msgList.notifyOnChanges();

  }

  private _updateErrorList(errorObjs) {
    const temp = [];
    if (errorObjs) {
      errorObjs.forEach(
        error => {
          temp.push(error);
        }
      );
    }
    this.errorList.emit(temp);

  }

  ngOnChanges(changes: SimpleChanges) {
    // since we can't detect changes on objects, using a separate flag
    if (changes['detailsChanged']) { // used as a change indicator for the model
      // console.log("the details cbange");
      if (this.contactRecord) {
        this.setToLocalModel();

      } else {
        this.contactFormLocalModel = ContactDetailsService.getReactiveModel(this._fb, this.isInternal);
        this.contactFormLocalModel.markAsPristine();
      }
    }

    if (changes['showErrors']) {

      this.showFieldErrors = changes['showErrors'].currentValue;
      let temp = [];
      if (this.msgList) {
        this.msgList.forEach(item => {
          temp.push(item);
          // console.log(item);
        });
      }
      this.errorList.emit(temp);
    }

  }

  /**
   * Uses the updated reactive forms model locally
   */

  setToLocalModel() {
    this.contactFormLocalModel = this.contactRecord;
    if (!this.contactFormLocalModel.pristine) {
      this.contactFormLocalModel.markAsPristine();
    }
  }

  removed(rec) {
    console.log(rec);
    // this.contactFormLocalModel.controls.country.setValue(null)
  }

  recordPrcsOnblur() {
    // console.log('');
    if (!this.contactFormLocalModel.controls['recordProcessed'].value) {
      this.contactFormLocalModel.controls['recordProcessed'].setValue('');
    }
  }

  onblur() {
    // console.log(' BLRRE$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');

  }


      /**
   * Changes the local model back to the last saved version of the contact
   */
      public revertContactRecord(): void {
        // this.revertRecord.emit(this.form);
        // this.f.markAsPristine();
      }
    
      /***
       * Deletes the contact reocord with the selected id from both the model and the form
       */
      public deleteContactRecord(): void {
        // this.errorSummaryChild = null;
        // this.deleteRecord.emit(this.f.value.id);
        // this._emitErrors();
      }
      /***
       * Deletes the contact reocord with the selected id from both the model and the form
       */
      public setStatusToRevise(): void {
        // const conRecord = <FormGroup>this.f['contactDetails'];
        // ling todo
        // if (conRecord.controls['status'].value != ContactDetailsService.statusListExternal[1].id) {
        //   conRecord.controls['status'].setValue(ContactDetailsService.statusListExternal[1].id);
        // }
        this.saveContactRecord();
      }
      /***
       * Deletes the contact reocord with the selected id from both the model and the form
       */
      public setStatusToRemove(): void {
        // const conRecord = <FormGroup>this.f['contactDetails'];
        // ling todo
        // if (conRecord.controls['status'].value != ContactDetailsService.statusListExternal[2].id) {
        //   conRecord.controls['status'].setValue(ContactDetailsService.statusListExternal[2].id);
        // }
        this.saveContactRecord();
      }
      /***
       * Deletes the contact reocord with the selected id from both the model and the form
       */
      public activeContactRecord(): void {
        // const conRecord = <FormGroup>this.f['contactDetails'];
        // ling todo
        // if (conRecord.controls['status'].value != ContactDetailsService.statusListExternal[3].id) {
        //   conRecord.controls['status'].setValue(ContactDetailsService.statusListExternal[3].id);
        // }
        this.saveContactRecord();
      }
    
      public saveContactRecord(): void { 
        // console.log(this.errorList);
        if (this.contactFormLocalModel.valid) {
          // this.saveRecord.emit((this.contactFormLocalModel));
          // this.showErrSummary = false;
          // this.showErrors = false;
          // this.contactFormLocalModel.markAsPristine();
   
          // this._routingService.navigateToWithExtra('', this.contactFormLocalModel.value);
  
          // convert form data to output object
          let newContactRec = this._addEditContactService.mapFormModelToDataModel(this.contactFormLocalModel, this.lang, this.languageList, this.contactStatusList);

          let enroll: Enrollment = this._globalService.getEnrollment();
          if (enroll) {
              let contacts : Contact[] = enroll.DEVICE_COMPANY_ENROL.contacts['contact'];
            //   for (const contact of contacts) {
            //     console.log(contact);
            //     // Access individual contact properties like contact.id, contact.name, etc.
            // }


              if (!this.contactRecord) {
                // this is a new contact record
                const nextId = this._listService.getNextId(contacts);
                newContactRec.id = nextId;
              }
              console.log(JSON.stringify(newContactRec));
              contacts.push(newContactRec);
          } else {
            // goto error page?
          }
         
  
          this.gotoHomePage();
  
        } else {
          this.checkInvalidFields();
          // id is used for an error to ensure the record gets saved
          // let temp = this.contactFormLocalModel.value.id;
          // this.contactFormLocalModel.controls['id'].setValue(1);
          // if (this.contactFormLocalModel.valid) {
          //   this.contactFormLocalModel.controls['id'].setValue(temp);
          //   this.saveRecord.emit((this.contactFormLocalModel));
          // } else {
          //   this.contactFormLocalModel.controls['id'].setValue(temp);
          //   this.showErrSummary = true;
          //   this.showErrors = true;
          // }
        }
      }
  
      checkInvalidFields() {
        Object.keys(this.contactFormLocalModel.controls).forEach(key => {
          const control = this.contactFormLocalModel.get(key);
          if (control.invalid) {
            console.log(`Field '${key}' is invalid`);
          }
        });
      }
  
    /**
     * Changes the local model back to the last saved version of the contact
     */
    public showErrorSummary(): boolean {
      // return (this.showErrSummary && this.errorList.length > 0);
      return true;
    }
  
  
    /**
     * show revise and remove contact button
     */
    public isExternalNotNewContact(): boolean {
      // const conRecord = <FormGroup>this.f['contactDetails'];
      // return (!this.isInternal && conRecord.controls['status'].value != 'NEW');
      return (!this.isInternal && this.f['status'].value != 'NEW');
    }
  
    /**
     * internal site show active contact button
     */
    public isInternalActiveContact(): boolean {
      // const conRecord = <FormGroup>this.f['contactDetails'];
      // return (this.isInternal && conRecord.controls['status'].value != 'REMOVE');
      return (this.isInternal && this.f['status'].value != 'REMOVE');
    }
  
    /**
     * External site show delete contact button
     */
    public isExternalNewContact(): boolean {
      // return (!this.isInternal && (<FormGroup>this.f['contactDetails']).controls['status'].value == 'NEW');
      return !this.isInternal && (this.f['status'].value == 'NEW');
    }
  
    /**
     * Internal site show delete contact button
     */
    public isInternalDeleteContact(): boolean {
      // return (this.isInternal && (<FormGroup>this.f['contactDetails']).controls['status'].value == 'REMOVE');
      return this.isInternal && (this.f['status'].value == 'REMOVE');
    }
  
    // get contactDetailsFormGroup() {
    //   return this.f.get('contactDetails') as FormGroup;
    // }    
  
    gotoHomePage(): void {
      this._routingService.navigateTo('');
    }

    // convenience getter for easy access to form fields
    get f() { return this.contactFormLocalModel.controls; }
}

