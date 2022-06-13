import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/user.model';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public localData: User[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    var localUserDetails: string = localStorage.getItem('userDetails') || '[]';
    this.localData = JSON.parse(localUserDetails);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onLogin() {
    console.log(this.loginForm.value, 'Forms Value');
    let user: { email: string; password: string } = this.loginForm.value;

    if (
      this.localData.find(
        (u) => u.email == user.email && u.password == user.password
      )
    ) {
      localStorage.setItem('access', 'true');
      alert('Success');
      this.router.navigate(['/dashboard']);
      return;
    }

    alert('Please enter valid credentials');

    this.loginForm.reset();
  }

  OnRegister() {
    this.router.navigate(['/register']);
  }
}
