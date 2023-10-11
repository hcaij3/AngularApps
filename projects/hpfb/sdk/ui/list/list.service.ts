import { Injectable } from '@angular/core';

@Injectable()
export class ListServiceNew {
  public getNextId(recordList) {
    let maxId = -1; // Initialize maxId with a value lower than any possible ID

    if (recordList && recordList.length !== 0) {

      for (const record of recordList) {
        const id = parseInt(record.id, 10); // Convert ID to a number

        if (id > maxId) {
          maxId = id;
        }
      }
    }

    return maxId + 1;
  }
}
