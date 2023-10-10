import {
  Component, Input, Output, OnInit, SimpleChanges, OnChanges, EventEmitter, ViewChildren, QueryList,
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation, Inject, Injector
} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ControlMessagesComponent, ICode, RoutingService, ValidationService } from '@hpfb/sdk/ui';
import { GlobalService } from '../../global/global.service';
import { AddEditContactService } from './add-edit.contact.service';
import { Enrollment } from '../../models/Enrollment';

@Component({
  selector: 'app-add-edit.contact',
  templateUrl: './add-edit.contact.component.html',
  styleUrls: ['./add-edit.contact.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditContactComponentCopy implements OnInit {
  @Input() detailsChanged: number;
  @Input() showErrors: boolean;
  

  @Output() errorList = new EventEmitter(true);
  @ViewChildren(ControlMessagesComponent) msgList: QueryList<ControlMessagesComponent>;

  contactFormLocalModel!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  public showFieldErrors: boolean = false;
  public isInternal: boolean;
  public helpTextSequences:any;
  public lang: string;
  public languageList: ICode[];
  private contactStatusList: ICode[];

  constructor(private _addEditContactService: AddEditContactService, private _globalService: GlobalService, private _routingService: RoutingService) {
    this.languageList = this._routingService.getStateData('navLanguageList');
    // console.log(this.languageList)
    this.contactStatusList = this._routingService.getStateData('navStatusList');
    console.log(this.contactStatusList)
  }

  ngOnInit() {
    // this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    // this._loggerService.logInfo(this.isAddMode+"");

    this.helpTextSequences = this._globalService.getHelpIndex();
    this.isInternal = this._globalService.$isInternal;

    // const myNonDepInjectedObj = this.injector.get(AbstractBridgeService);
    // this.helpTextSequences = myNonDepInjectedObj.getHelpIndex();
    // password not required in edit mode
    // const passwordValidators = [Validators.minLength(6)];
    // if (this.isAddMode) {
    //     passwordValidators.push(Validators.required);
    // }

    // const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };
    // this.form = this.formBuilder.group({
    //     title: ['', Validators.required],
    //     firstName: ['', Validators.required],
    //     lastName: ['', Validators.required],
    //     email: ['', [Validators.required, Validators.email]],
    //     role: ['', Validators.required],
    //     password: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
    //     confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
    // });
     // if (!this.isAddMode) {
    //     this.userService.getById(this.id)
    //         .pipe(first())
    //         .subscribe(x => this.f.patchValue(x));
    // }
   
    this.contactFormLocalModel = this._addEditContactService.getReactiveModel(this.isInternal);


}

// convenience getter for easy access to form fields
get f() { return this.contactFormLocalModel.controls; }

onSubmit() {
    // this.submitted = true;

    // // reset alerts on submit
    // this.alertService.clear();

    // // stop here if form is invalid
    // if (this.f.invalid) {
    //     return;
    // }

    // this.loading = true;
    // if (this.isAddMode) {
    //     this.createUser();
    // } else {
    //     this.updateUser();
    // }
}

// private createUser() {
//     this.userService.create(this.f.value)
//         .pipe(first())
//         .subscribe(() => {
//             this.alertService.success('User added', { keepAfterRouteChange: true });
//             this.router.navigate(['../'], { relativeTo: this.route });
//         })
//         .add(() => this.loading = false);
// }

// private updateUser() {
//     this.userService.update(this.id, this.f.value)
//         .pipe(first())
//         .subscribe(() => {
//             this.alertService.success('User updated', { keepAfterRouteChange: true });
//             this.router.navigate(['../../'], { relativeTo: this.route });
//         })
//         .add(() => this.loading = false);
// }
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
        let contactRec = this._addEditContactService.mapFormModelToDataModel(this.contactFormLocalModel, this.lang, this.languageList, this.contactStatusList);
        // console.log(JSON.stringify(contactRec));
        let enroll: Enrollment = this._globalService.getEnrollment();
        if (enroll) {
            let contacts = enroll.DEVICE_COMPANY_ENROL.contacts;
            const largestId = contacts.reduce((maxId, obj) => {
              return obj.id > maxId ? obj.id : maxId;
            }, -Infinity);
            //  console.log(largestId);
             if (!isFinite(largestId)) {
              // the array is empty
              contactRec.id = 1
             } else {
              contactRec.id = largestId + 1
             }
            //  console.log(JSON.stringify(contactRec));
             enroll.DEVICE_COMPANY_ENROL.contacts.push(contactRec);
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
}
