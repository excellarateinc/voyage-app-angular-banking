import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { AccountsService } from '../accounts.service';
import { Account } from '../account.model';
import { AccountType } from '../account-type.enum';

@Component({
  selector: 'app-credit-application',
  templateUrl: './credit-application.component.html',
  styleUrls: ['./credit-application.component.scss']
})
export class CreditApplicationComponent implements OnInit {
  creditApplicationForm: FormGroup;

  constructor(
    private accountsService: AccountsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.initializeForm();
  }

  applyForCredit(): void {
    if (this.creditApplicationForm.invalid) {
      return;
    }

    const account = this.creditApplicationForm.value as Account;
    account.type = AccountType.Credit;
    this.accountsService.createAccount(account)
      .subscribe(result => {
        this.snackBar.open(`${result.name} created successfully`, null, { duration: 5000, extraClasses: ['voyage-snackbar'] });
        this.router.navigate(['/examples/banking/dashboard']);
      }, error => {
        this.snackBar.open(error[0].errorDescription, null, { duration: 5000, extraClasses: ['voyage-snackbar'] });
      });
  }

  private initializeForm(): void {
    this.creditApplicationForm = this.formBuilder.group({
      type: [null, Validators.required],
      name: [null, Validators.required]
    });
  }
}
