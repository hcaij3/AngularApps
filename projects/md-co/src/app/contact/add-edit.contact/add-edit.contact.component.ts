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
export class AddEditContactComponent implements OnInit {
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
  public contactStatusList: ICode[];

  constructor(private _addEditContactService: AddEditContactService, private _globalService: GlobalService, private _routingService: RoutingService) {
    this.languageList = this._routingService.getStateData('navLanguageList');
    this.contactStatusList = this._routingService.getStateData('navStatusList');
    if (!this.languageList || !this.contactStatusList) {
      this._routingService.navigateTo("")
    }
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
   
    // this.contactFormLocalModel = this._addEditContactService.getReactiveModel(this.isInternal);


}



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


}
