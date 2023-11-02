export const ROOT_TAG: string = 'DEVICE_COMPANY_ENROL';
export const DATA_PATH: string = './assets/data/';
export const NEW:string='NEW';
export const AMEND:string='AMEND';
export const FINAL:string='FINAL';
export const REVISE:string='REVISE';
export const ACTIVE:string='ACTIVE';
export const REMOVE:string='REMOVE';
export const XSLT_PREFIX = 'REP_MDS_CO_';

// this needs to match the OTHER code value in amendReasons.json
export const AMEND_OTHER_REASON_CODE = 'OTHER';  

// this needs to match the code values in contactStatuses.json
export const CONT_STATUS_NEW = 'NEW';
export const CONT_STATUS_REVISE = 'REVISE';
export const CONT_STATUS_REMOVE = 'REMOVE'
export const CONT_STATUS_ACTIVE = 'ACTIVE';

// todo only keep one of the contact status list
export const ContactStatus = {
  NEW,
  REVISE,
  REMOVE,
  ACTIVE
} 
// export enum EnrollmentStatus {
//     NEW = 'fr_NEW',
//     AMEND = 'fr_AMEND',
//     FINAL = 'fr_FINAL'
//   }

export const helpInstructionHeadings = ['loadFileIndx',
                                        'compREPInx',
                                        'rationaleInx',
                                        'conStatInx',
                                        'routIdInx',
                                        'desRenewalInx',
                                        'desFinanceInx']
