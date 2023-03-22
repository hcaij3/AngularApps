import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ICodeDefinition, ICode, IParentChildren } from '../shared/data';
import { ControlMessagesComponent } from '../error-msg/control-messages.component/control-messages.component';
import { GlobalsService } from '../globals/globals.service';
import { FormGroup } from '@angular/forms';
import { RegulatoryInformationService } from './regulatory-information.service';
import { Ectd } from '../models/transaction';

@Component({
  selector: 'app-regulatory-information',
  templateUrl: './regulatory-information.component.html',
  styles: [],
})
export class RegulatoryInformationComponent implements OnInit, OnDestroy {
  public mfDetailsFormLocalModel: FormGroup; // todo rename variable
  @Input('group') public mfDetailsFormRecord: FormGroup;
  @Input() detailsChanged: number;
  @Input() showErrors: boolean;
  @Input() dataModel: Ectd;
  @Input() lang;
  @Input() helpIndex;
  @Output() errorList = new EventEmitter(true);
  @Output() isSolicitedFlag = new EventEmitter(true);
  @ViewChildren(ControlMessagesComponent)
  msgList: QueryList<ControlMessagesComponent>;

  yesNoList: string[] = GlobalsService.YESNOList;
  mfTypeOptions: ICodeDefinition[];
  mfTypeDescArray: IParentChildren[] = [];
  mfUseOptions: ICode[];
  txDescOptions: ICode[];
  selectedMfTypeDefinition: string;
  selectedTxDescDefinition: string;
  public showFieldErrors: boolean = false;
  public showDateAndRequester: boolean = false;
  mfTypeSub!: Subscription;
  mfTypeTxDescSub!: Subscription;
  mfUseSub!: Subscription;

  showDateAndRequesterTxDescs: string[] = ['12', '13', '14']; // Transaction Description values are defined in txDescriptions.json

  constructor(private _regulatoryInfoService: RegulatoryInformationService) {
    this.showFieldErrors = false;
    this.mfDetailsFormLocalModel = _regulatoryInfoService.getRegularInfoForm();
  }

  ngOnInit(): void {
    console.log('ngOnInit ~ yesNoList', this.yesNoList);

    this.mfTypeSub = this._regulatoryInfoService
      .getMasterFileTypes()
      .subscribe((response) => (this.mfTypeOptions = response));

    this.mfTypeTxDescSub = this._regulatoryInfoService
      .getMasterFileTypeAndTransactionDescription()
      .subscribe((response) => (this.mfTypeDescArray = response));


    this.mfUseSub = this._regulatoryInfoService
      .getMasterFileUses()
      .subscribe((response) => (this.mfUseOptions = response));
  }

  ngAfterViewInit() {
    this.msgList.changes.subscribe((errorObjs) => {
      const temp = [];
      this._updateErrorList(errorObjs);
    });
    this.msgList.notifyOnChanges();
  }

  private _updateErrorList(errorObjs) {
    const temp = [];
    if (errorObjs) {
      errorObjs.forEach((error) => {
        temp.push(error);
      });
    }
    this.errorList.emit(temp);
  }

  ngOnChanges(changes: SimpleChanges) {
    const isFirstChange = GlobalsService.isFirstChange(changes);
    console.log("RegulatoryInformationComponent ~ ngOnChanges ~ isFirstChange:", isFirstChange);
    
    // since we can't detect changes on objects, using a separate flag
    // if (changes['detailsChanged']) {
    //   // used as a change indicator for the model
    //   // console.log("the details cbange");
    //   if (this.mfDetailsFormRecord) {
    //     this.setToLocalModel();
    //   } else {
    //     this.mfDetailsFormLocalModel = this.detailsService.getReactiveModel(
    //       this._fb
    //     );
    //     this.mfDetailsFormLocalModel.markAsPristine();
    //   }
    // }
    
    // Ignore first trigger of ngOnChanges
    if (!isFirstChange) {
      if (changes['showErrors']) {
        this.showFieldErrors = changes['showErrors'].currentValue;
        console.log(
          'MasterFileDetailsComponent ~ ngOnChanges ~ this.showFieldErrors',
          this.showFieldErrors
        );
        const temp = [];
        if (this.msgList) {
          this.msgList.forEach((item) => {
            temp.push(item);
            // console.log(item);
          });
        }
        this.errorList.emit(temp);
      }
      if (changes['mfDetailsFormLocalModel']) {
        //?????????
        // console.log('**********the master-file details changed');
        this.mfDetailsFormRecord = this.mfDetailsFormLocalModel;
      }
      if (changes['dataModel']) {
        const dataModelCurrentValue = changes['dataModel'].currentValue as Ectd;
        // if (!this.mfDetailsFormLocalModel) {
        //   this.mfDetailsFormLocalModel = this.detailsService.getReactiveModel(
        //     this._fb
        //   );
        //   this.mfDetailsFormLocalModel.markAsPristine();
        // }
        this._regulatoryInfoService.mapDataModelToFormModel(
          dataModelCurrentValue,
          <FormGroup>this.mfDetailsFormLocalModel,
          this.lang
        );

        this.onMfTypeSelected(null);

        this.onTxDescriptionSelected(null);

        // this._updateLists();
        // this._setDescFieldFlags(
        //   this.mfDetailsFormLocalModel.controls['descriptionType'].value
        // );
      }
    }
    //   if (changes['userList']) {
    //     this.userList = changes['userList'].currentValue;
    //   }
  }

  ngOnDestroy() {
    // unsubscribe the subscription(s)
    this.mfTypeSub.unsubscribe();
    this.mfTypeTxDescSub.unsubscribe();
    this.mfUseSub.unsubscribe();
  }

  onblur() {
    // console.log('onblur');
    this._saveData();
  }

  onMfTypeSelected(e: any): void {
    const mfTypeControl = this.mfDetailsFormLocalModel.get('masterFileType');
    // todo check lang for defEn/defFr
    this.selectedMfTypeDefinition = mfTypeControl?.value.defEn;
    // get the transaction description dropdown list
    this._getTransactionDescriptions();

    if (e) {
      // when the action is triggered from the UI
      this._saveData();
    }
  }

  onTxDescriptionSelected(e: any): void {
    const txDescControl = this.mfDetailsFormLocalModel.get('descriptionType');
    // console.log(txDescControl.value);
    // todo check lang for defEn/defFr
    this.selectedTxDescDefinition = txDescControl?.value.defEn;
    this.showDateAndRequester = this.showDateAndRequesterTxDescs.includes(
      txDescControl?.value.id
    );

    if (e) {
      // when the action is triggered from the UI    
      this._saveData();
    }
  }

  private _saveData() {
    this._regulatoryInfoService.mapFormModelToDataModel(
      <FormGroup>this.mfDetailsFormLocalModel,
      this.dataModel,
      this.lang
    );
  }
  
  // dynamically load the transaction description dropdowns according to the master type value
  private _getTransactionDescriptions(): void {
    const mfTypeControl = this.mfDetailsFormLocalModel.get('masterFileType');
    const selectedMfTypeId = mfTypeControl?.value.id;
    // console.log("RegulatoryInformationComponent ~ _getTransactionDescriptions ~ selectedMfTypeId:", selectedMfTypeId);
    this.txDescOptions = GlobalsService.filterParentChildrenArray(this.mfTypeDescArray, selectedMfTypeId);
  }

}
