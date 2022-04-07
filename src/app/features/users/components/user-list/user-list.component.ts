import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Column, Result } from '../../models/users';
import { UsersService } from '../../services/users.service';
import * as FileSaver from 'file-saver';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  private _destroyed$ = new Subject<void>();

  users!: Result[];
  cols: Column[] = [{ field: 'name', header: 'Name' },
  { field: 'gender', header: 'Gender' },
  { field: 'location', header: 'Location' },
  { field: 'email', header: 'Email' },
  { field: 'age', header: 'Age' },
  { field: 'seniority', header: 'Seniority' },
  { field: 'phoneNumber', header: 'Phone Number' },
  { field: 'nationality', header: 'Nationality' }];

  selectedColumns!: Column[];
  // gender = [
  //   { id:1, name:'Female' },
  //   { id:2, name:'Male' }
  // ]
  // selectedGender = [];
  // filteredUser!: Result[];
  // mainUesr!: Result[]

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
    this.selectedColumns = this.cols;
  }

  getUsers(): void {
    this.userService.getUsers().pipe(takeUntil(this._destroyed$))
    .subscribe(users => {
      this.users = users;
      // this.mainUesr = this.users;
      console.log(this.users);
      
    },
    error => {}
    );
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.users);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "users");
    });
  }

  saveAsExcelFile(buffer: BlobPart, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }  

  @Input() get selectedCols(): Column[] {
    return this.selectedColumns;
  }

  set selectedCols(val: Column[]) {
      this.selectedColumns = this.cols.filter((col: Column) => val.includes(col));
  }

  // getSelectedGender(): void {
  //   this.users = this.mainUesr;
  //   if(this.selectedGender.length > 0) {
  //     this.filteredUser = [];
  //     this.selectedGender.forEach(selectedGender => {
  //       this.filteredUser.push(...this.users.filter(user => user.gender === selectedGender))
  //     });
  //     this.users = this.filteredUser
  //   }
  // }


  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

}
