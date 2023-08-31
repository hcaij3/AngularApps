import { Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ValidationService {

  constructor(private translateService : TranslateService) {
    // private translate: TranslateService
    // this.translate.get('error.msg.required').subscribe(res => { console.log(res); });

  }


  public getValidatorErrorMessage(validatorName: string, validatorValue?: any) {

    // TODO sucky need to make the keys the same as the translation for the error summary
    const config = {
      'required': 'required',
      'error.msg.number': 'error.msg.number',
      'error.msg.phone': 'error.msg.phone',
      'error.msg.fax': 'error.msg.fax',
      'error.msg.email': 'error.msg.email',
      'error.msg.account':'error.msg.account',
      'error.msg.business':'error.msg.business',
      'minlength': `${this.translateService.instant('minlength')}${validatorValue.requiredLength}${this.translateService.instant('minlength.number')}`,
      'error.msg.postal': 'error.msg.postal',
      'error.msg.zip': 'error.msg.zip',
      'error.mgs.company.id': 'error.mgs.company.id',
      'error.mgs.contact.id': 'error.mgs.contact.id',
      'error.mgs.primary.company.id': 'error.mgs.primary.company.id',
      'error.mgs.primary.contact.id': 'error.mgs.primary.contact.id',
      'error.mgs.regu.company.id': 'error.mgs.regu.company.id',
      'error.mgs.regu.contact.id': 'error.mgs.regu.contact.id',
      'error.mgs.dossier.id': 'error.mgs.dossier.id',
      'error.mgs.licence.number': 'error.mgs.licence.number',
      'error.mgs.application.number': 'error.mgs.application.number',
      'error.mgs.din': 'error.mgs.din',
      'error.mgs.npn': 'error.mgs.npn',
      'error.mgs.incorrectFormat': 'error.mgs.incorrectFormat',
      'error.msg.invalidDate': 'error.msg.invalidDate',
    };

    return config[validatorName];
  }

  static emailValidator(control) {
    if (!control.value) {
      return null;
    }
    // RFC 2822 compliant regex
    if (control.value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
      return null;
    } else {
      return {'error.msg.email': true};
    }
  }

  /*static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return {'invalidPassword': true};
    }
  }*/
  static canadaPostalValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^(?!.*[DFIOQU])[A-VXYa-vxy][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]$/)) {
      return null;
    } else {
      return {'error.msg.postal': true};
    }

  }

  static usaPostalValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]{5}(?:-[0-9]{4})?$/)) {
      return null;
    } else {
      return {'error.msg.zip': true};
    }
  }

  static countryValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value[0].id !== '') {
      return null;
    } else {
      return {'required': true};
    }
  }

  static phoneNumberValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]*$/)) {
      return null;
    } else {
      return {'error.msg.phone': true};
    }
  }

  static faxNumberValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]*$/)) {
      return null;
    } else {
      return {'error.msg.fax': true};
    }
  }

  static accountNumberValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]*$/)) {
      return null;
    } else {
      return {'error.msg.account': true};
    }
  }

  static businessNumberValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]*$/)) {
      return null;
    } else {
      return {'error.msg.business': true};
    }
  }

  static numberValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]*$/)) {
      return null;
    } else {
      return {'error.msg.number': true};
    }
  }

  static companyIdValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]{6}$/)) {
      return null;
    } else {
      return {'error.mgs.company.id': true};
    }
  }

  static regulatoryCompanyIdValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]{6}$/)) {
      return null;
    } else {
      return {'error.mgs.company.id': true};
    }
  }

  // if first letter is e, then followed by 6 numbers
  // if first letter is f, then followed by 7 numbers
  static dossierIdValidator(control) {
    if (!control.value) {
      return null;
    }
    if (
      control.value.match(/^[e]{1}[0-9]{6}$/) ||
      control.value.match(/^[f]{1}[0-9]{7}$/)
    ) {
      return null;
    } else {
      return {'error.mgs.dossier.id': true};
    }
  }

  static dossierContactIdValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]{5}$/)) {
      return null;
    } else {
      return {'error.mgs.contact.id': true};
    }
  }

  static regulatoryContactIdValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]{5}$/)) {
      return null;
    } else {
      return {'error.mgs.regu.contact.id': true};
    }
  }

  static licenceNumValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]{6}$/)) {
      return null;
    } else {
      return {'error.mgs.licence.number': true};
    }
  }

  static appNumValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]{6}$/)) {
      return null;
    } else {
      return {'error.mgs.application.number': true};
    }
  }

  static dinValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]{8}$/)) {
      return null;
    } else {
      return {'error.mgs.din': true};
    }
  }

  static npnValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]{8}$/)) {
      return null;
    } else {
      return {'error.mgs.npn': true};
    }
  }

  static checkboxRequiredValidator(control) {
    if (control.value) {
      return null;
    } else {
      return {'required': true};
    }
  }

  static primaryContactIdValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]{5}$/)) {
      return null;
    } else {
      return {'error.mgs.contact.id': true};
    }
  }

  static primaryCompanyIdValidator(control) {
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]{6}$/)) {
      return null;
    } else {
      return { 'error.mgs.company.id': true };
    }
  }

  // 4 numeric - 3 numeric
  static masterfileNumberValidator(control) {
    // todo
    if (!control.value) {
      return null;
    }
    if (control.value.match(/^[0-9]{4}-[0-9]{3}$/)) {
      return null;
    } else {
      return { 'error.mgs.incorrectFormat': true }; 
    }
  }

}
