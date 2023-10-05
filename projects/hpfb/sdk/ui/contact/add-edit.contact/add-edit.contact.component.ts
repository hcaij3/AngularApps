import {
  Component, Input, Output, OnInit, SimpleChanges, OnChanges, EventEmitter, ViewChildren, QueryList,
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation, Inject, Injector
} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ControlMessagesComponent } from '../../error-msg/control-messages/control-messages.component';
// import {ContactDetailsService} from './contact.details.service';
import {isArray} from 'util';
import { ICode } from '../../data-loader/data';
import { RoutingService } from '../../routing/routing.service';
import { ValidationService } from '../../validation/validation.service';
import { MinimalLogger } from '../../minimal-logger.service';
import { BRIDGE_SERVICE_ADAPTER, BridgeServiceAdapter } from '../../bridge.service';   

@Component({
  selector: 'lib-add-edit.contact',
  templateUrl: './add-edit.contact.component.html',
  styleUrls: ['./add-edit.contact.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditContactComponent implements OnInit {
  @Input() detailsChanged: number;
  @Input() showErrors: boolean;
  @Input() isInternal: boolean;
  @Input() languageList: ICode[];
  @Input() contactStatusList: ICode[];
  @Input() lang;
  // @Input() helpTextSequences;
  @Output() errorList = new EventEmitter(true);
  @ViewChildren(ControlMessagesComponent) msgList: QueryList<ControlMessagesComponent>;

  contactFormLocalModel!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  public showFieldErrors: boolean = false;
  helpTextSequences:any;

  constructor(
      private formBuilder: FormBuilder,
      private _routingService: RoutingService, private _loggerService: MinimalLogger, @Inject(BRIDGE_SERVICE_ADAPTER) private bridgeService: BridgeServiceAdapter //, @Inject(Service) private _bridgeService: AbstractBridgeService
  ) { 

  }

  ngOnInit() {
    // this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this._loggerService.logInfo(this.isAddMode+"");

    this.helpTextSequences = this.bridgeService.getHelpIndex();

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
    //         .subscribe(x => this.form.patchValue(x));
    // }
    // const contactIdValidators = isInternal ? [Validators.required, ValidationService.dossierContactIdValidator] : [];
    const contactIdValidators = [];
    this.contactFormLocalModel =     
    // const recordProcessedValidator = isInternal ? [Validators.required] : [];
    this.formBuilder.group({
      contactId: [null, contactIdValidators],
      status: 'NEW',
      // hcStatus: [null, Validators.required],
      // salutation: [null, Validators.required],
      fullName: [null, Validators.required],
      // initials: '',
      // lastName: [null, Validators.required],
      language: '',
      jobTitle: [null, Validators.required],
      faxNumber: ['', [Validators.minLength(10), ValidationService.faxNumberValidator]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), ValidationService.phoneNumberValidator]],
      phoneExtension: '',
      email: [null, [Validators.required, ValidationService.emailValidator]],
      routingId: ''
      // recordProcessed: [null, recordProcessedValidator]
    });


}

// convenience getter for easy access to form fields
get f() { return this.contactFormLocalModel.controls; }

onSubmit() {
    // this.submitted = true;

    // // reset alerts on submit
    // this.alertService.clear();

    // // stop here if form is invalid
    // if (this.form.invalid) {
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
//     this.userService.create(this.form.value)
//         .pipe(first())
//         .subscribe(() => {
//             this.alertService.success('User added', { keepAfterRouteChange: true });
//             this.router.navigate(['../'], { relativeTo: this.route });
//         })
//         .add(() => this.loading = false);
// }

// private updateUser() {
//     this.userService.update(this.id, this.form.value)
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
}
