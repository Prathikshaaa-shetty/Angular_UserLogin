import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { User } from '../../shared/user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  // public email:any;
  // public password:any;
  // public confirmPassword:any;
  // public firstName:any;
  // public lastName:any;

  public registerForm!: FormGroup;
  public localData: User[] = [];
  hide: any;

  constructor(private fb: FormBuilder, private router: Router) {
    var localUserDetails: string = localStorage.getItem('userDetails') || '[]';
    this.localData = JSON.parse(localUserDetails);
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  register() {
    console.log('register Button Clicked');
    console.log(this.registerForm.value, 'Forms Value');
    let value = this.registerForm.value;

    let userData: User = { id: this.generateUserId(), ...value };

    if (this.registerForm.valid) {
      if (!this.validateEmail(userData.email)) {
        alert('Email already registered, Please login');
        this.router.navigate(['/login']);
      }
      this.localData.push(userData);

      localStorage.setItem('userDetails', JSON.stringify(this.localData));

      alert('Successfully registered!');
    }
    this.router.navigate(['/login']);
    this.registerForm.reset();
  }

  generateUserId(): number {
    if (this.localData == null) {
      return 1;
    }
    var userIds: number[] = this.localData.map((user) => user.id);

    if (userIds == null) {
      return 1;
    }

    if (userIds.length <= 0) {
      return 1;
    }

    return Math.max(...userIds) + 1; //copy the user ids
  }

  validateEmail(email: string): boolean {
    if (!email) {
      return true;
    }
    var isValidEmail = this.localData.every((u) => email != u.email);
    return isValidEmail;
  }

  login() {
    this.router.navigate(['/login']);
  }
}
