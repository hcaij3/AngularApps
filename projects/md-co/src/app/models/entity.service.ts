import { Injectable } from '@angular/core';
import { Contact } from './Enrollment';

@Injectable()
export class EntityService {

    getEmptyContactModel(): Contact{
  
      return (
        {
          id: 0,
          contact_id: '',
          status: undefined,
          status_text: '',
          full_name: '',
          language: undefined,
          job_title: '',
          fax_number: '',
          phone_number: '',
          phone_extension: '',
          email: '',
          RoutingID: ''
        }
      );
    }
  

}
