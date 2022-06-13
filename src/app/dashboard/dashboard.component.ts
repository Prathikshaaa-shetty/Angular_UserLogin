import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EditUserPasswordComponent } from './edit-user-password/edit-user-password.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'password',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public tableData: any;
  constructor(public dialog: MatDialog, private router: Router) {
    this.bindTableData();
  }

  bindTableData() {
    var localUserDetails: string = localStorage.getItem('userDetails') || '[]';
    this.tableData = JSON.parse(localUserDetails);
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(row: any) {
    this.router.navigateByUrl(`/dashboard/${row.id}`);
    // let dialogRef = this.dialog.open(EditUserPasswordComponent, {
    //   width: 'auto',
    //   height: 'auto',
    //   data: {
    //     editUser: row,
    //   },
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   this.bindTableData();
    // });

    console.log('rowData', row);
  }

  logout() {
    localStorage.setItem('access', 'false');
    this.router.navigateByUrl('/login');
  }
}
