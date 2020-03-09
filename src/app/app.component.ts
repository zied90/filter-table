import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  positionList: string[] = ['Active', 'Pending', 'Issued'];
  displayedColumns = ['position', 'name', 'email', 'status'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  // none value
  filterValues = {
    position: [],
    name: '',
    email: '',
    status: ''
  };

 // @ViewChild(MatPaginator) paginator: MatPaginator;
  // form group
  filterForm = new FormGroup({
    position: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    status: new FormControl(),
  });

  get position() {
    return this.filterForm.get('position');
  }

  get name() {
    return this.filterForm.get('name');
  }

  get email() {
    return this.filterForm.get('email');
  }

  get status() {
    return this.filterForm.get('status');
  }


  ngOnInit() {
    this.formSubscribe();
    this.getFormsValue();
  }

  // form subscribe
  formSubscribe() {
    this.position.valueChanges.subscribe(positionValue => {
      this.filterValues['position'] = positionValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.name.valueChanges.subscribe(nameValue => {
      this.filterValues['name'] = nameValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.email.valueChanges.subscribe(emailValue => {
      this.filterValues['email'] = emailValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.status.valueChanges.subscribe(statusValue => {
      this.filterValues['staus'] = statusValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  // create filter
  getFormsValue() {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      let isPositionAvailable = false;
      if (searchString.position.length) {
        for (const d of searchString.position) {
          if (data.position.trim() === d) {
            isPositionAvailable = true;
          }
        }
      } else {
        isPositionAvailable = true;
      }
      const resultValue = isPositionAvailable &&
        data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1 &&
        data.email.toString().trim().toLowerCase().indexOf(searchString.email.toLowerCase()) !== -1 &&
        data.status.toString().trim().toLowerCase().indexOf(searchString.status.toLowerCase()) !== -1;

      return resultValue;

    };
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }


}


export interface Element {
  name: string;
  position: string;
  email: string;
  status: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 'Active', name: 'name1', email: 'mail1@mail.com', status: 'Yes'},
  {position: 'Pending', name: 'name2', email: 'mail2@mail.com', status: 'No'},
  {position: 'Issued', name: 'name3', email: 'mail3@mail.com', status: 'Yes'},
  {position: 'Active', name: 'name4', email: 'mail4@mail.com', status: 'No'},
  {position: 'Pending', name: 'name5', email: 'mail5@mail.com', status: 'Yes'},
  {position: 'Pending', name: 'name6', email: 'mail6@mail.com', status: 'No'},
  {position: 'Active', name: 'name7', email: 'mail7@mail.com', status: 'Yes'},
  {position: 'Pending', name: 'name8', email: 'mail8@mail.com', status: 'No'},
  {position: 'Issued', name: 'name9', email: 'mail9@mail.com', status: 'Yes'},
  {position: 'Active', name: 'name10', email: 'mail10@mail.com', status: 'No'},
];
