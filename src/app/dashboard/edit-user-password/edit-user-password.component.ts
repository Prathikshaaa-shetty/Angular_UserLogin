import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {MD_DIALOG_DATA} from '@angular/material/dialog';

import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-edit-user-password',
  templateUrl: './edit-user-password.component.html',
  styleUrls: ['./edit-user-password.component.scss'],
})

export class EditUserPasswordComponent implements OnInit {
  public userEditForm!: FormGroup;
  public values: any;
  public userData: User;
  private localData: User[] = [];

  constructor(

    public dialogRef: MatDialogRef<EditUserPasswordComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,

    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute

  ) {

    var localUserDetails: string = localStorage.getItem('userDetails') || '[]';

    this.localData = JSON.parse(localUserDetails);
    this.userEditForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.userData = data.editUser;
  }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe((params: any) => console.log(params));

    this.values = this.dialogRef;
    console.log(this.values, 'data');

    this.userEditForm.patchValue(this.userData);

  }

  updateUserData() {

    if (this.userEditForm.valid) {
      
      let user: User = this.userEditForm.value;

      if (this.localData.find((u) => u.email == user.email)) {
        this.localData = this.localData.map((u) => {
          if (u.email == user.email) {
            u = user;
          }
          return u;
        });
        localStorage.setItem('userDetails', JSON.stringify(this.localData));
        this.dialogRef.close();
      }
      return;
    }

    alert('enter valid xxxx');
  }

}
