import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { LoginService } from './login.service';
import { Login } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed = false;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const login = this.loginForm.value as Login;
    this.loginService.login(login)
      .subscribe(result => {
        window.location.href = '/';
      }, error => this.loginFailed = true);
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
