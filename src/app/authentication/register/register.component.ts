import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { MobileService } from '../../core/mobile.service';
import { RegisterService } from './register.service';
import { Register } from './register.model';
import { Phone } from '../../core/user/phone.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registrationErrors: Array<any>;
  working = false;
  isMobile = false;
  private watcher: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private snackBar: MdSnackBar,
    private mobileService: MobileService) { }

  ngOnInit() {
    this.initializeForm();
    this.isMobile = this.mobileService.isMobile();
    this.watcher = this.mobileService.mobileChanged$.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.working = true;
    const register = this.registerForm.value as Register;
    this.registerService.register(register)
      .subscribe(result => {
        this.snackBar.open(
          'Successfully registered! Please login to your new account', null, { duration: 5000, extraClasses: ['voyage-snackbar'] });
        this.router.navigate(['/authentication/login']);
        this.working = false;
      }, errors => {
        this.registrationErrors = errors;
        this.working = false;
      });
  }

  private initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }
}
