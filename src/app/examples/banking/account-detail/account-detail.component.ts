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

  constructor(
    private route: ActivatedRoute,
    private accountsService: AccountsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      const accountId = +params['id'];
      this.accountsService.getAccountDetails(accountId)
        .subscribe((result: Account) => {
          this.account = result;
          this.initializeForm(this.account);
        });
   });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
