import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { Observable } from 'rxjs/Observable';
import { AccountsService } from '../accounts.service';
import { TransactionHistory } from '../transaction-history.model';
import { Account } from '../account.model';
import { Transaction } from '../transaction.model';
import { TransactionType } from '../transaction-type.enum';

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html',
  styleUrls: ['./accounts-dashboard.component.scss']
})
export class AccountsDashboardComponent implements OnInit {
  transactions: Array<Transaction>;
  accounts: Array<Account>;
  barChart: any;
  working = false;

  constructor(private accountsService: AccountsService) { }

  ngOnInit() {
    this.working = true;

    this.accountsService.getAccounts()
      .subscribe(accounts => {
        this.accounts = accounts;
        this.working = false;
        this.buildBarChart(this.accounts);
      });

    this.accountsService.getRecentTransactions()
      .subscribe(transactions => {
        this.transactions = transactions;
      });
  }

  private buildBarChart(accounts: Array<Account>): void {
    this.barChart = {
      data: [],
      labels: ['Current Balance'],
      options: {
        scaleShowVerticalLines: false,
        responsive: true
      },
      colors: [
        {
          backgroundColor: '#00838f'
        },
        {
          backgroundColor: '#37474f'
        },
        {
          backgroundColor: '#005662'
        },
        {
          backgroundColor: '#4fb3bf'
        }
      ],
      legend: false,
      type: 'bar'
    };

    for (let i = 0; i < accounts.length; i++) {
      this.barChart.data.push({
        data: [ accounts[i].balance ],
        label: accounts[i].name
      });
    }
  }
}
