import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AccountsService } from '../accounts.service';
import { Account } from '../account.model';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit, OnDestroy {
  private subscription: any;
  account: Account;
  accountForm: FormGroup;
  working = false;

  constructor(
    private route: ActivatedRoute,
    private accountsService: AccountsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.working = true;
    this.subscription = this.route.params.subscribe(params => {
      const accountId = +params['id'];
      this.accountsService.getAccountDetails(accountId)
        .subscribe((result: Account) => {
          this.account = result;
          this.initializeForm(this.account);
          this.working = false;
        });
   });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateAccount(): void {
    if (this.accountForm.invalid) {
      return;
    }
    const name = this.accountForm.get('name').value;
    this.accountsService.updateAccount(this.account.accountId, name)
      .subscribe((result: string) => {
        this.account.name = result;
      });
  }

  private initializeForm(account: Account): void {
    if (account == null) {
      return;
    }
    this.accountForm = this.formBuilder.group({
      name: [account.name, Validators.required]
    });
  }
}
