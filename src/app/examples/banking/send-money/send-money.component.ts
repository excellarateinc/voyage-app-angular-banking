import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { AccountsService } from '../accounts.service';
import { Account } from '../account.model';
import { SendMoney } from './send-money.model';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.scss']
})
export class SendMoneyComponent implements OnInit {
  accounts: Array<Account>;
  sendMoneyForm: FormGroup;

  constructor(
    private accountsService: AccountsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.accountsService.getAccounts()
      .subscribe(result => this.accounts = result);

    this.initializeForm();
  }

  sendMoney(): void {
    if (this.sendMoneyForm.invalid) {
      return;
    }

    const sendModel = this.sendMoneyForm.value as SendMoney;
    this.accountsService.sendMoney(sendModel)
      .subscribe(result => {
        this.snackBar.open('Completed successfully', null, { duration: 5000 });
        this.router.navigate(['/examples/banking/dashboard']);
      }, error => {
        this.snackBar.open(error[0].errorDescription, null, { duration: 5000 });
      });
  }

  private initializeForm(): void {
    this.sendMoneyForm = this.formBuilder.group({
      fromAccountId: [null, Validators.required],
      toEmailAddress: [null, Validators.required],
      amount: [null, Validators.required],
      memo: ['']
    });
  }
}
