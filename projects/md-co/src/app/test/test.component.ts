import { Component, OnInit } from '@angular/core';
import { DATA_PATH, ENGLISH } from 'projects/common/src/app/constants';
import { ICode } from 'projects/common/src/app/data';
import { DataService } from 'projects/common/src/app/data.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  lang = ENGLISH;
  countries: ICode[] = [];
  countries$: Observable<ICode>;
  currentUser: any;

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    const countriesDataPath = DATA_PATH + "countries.json";
    this._dataService.getData<ICode[]>(countriesDataPath).subscribe(
      (data) => {
        this.countries = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    this.countries$ = this._dataService.getData<ICode>(countriesDataPath);
    
    this.currentUser = {
      name: 'John Doe',
      bio: 'Frontend Developer',
    };
  }
}
