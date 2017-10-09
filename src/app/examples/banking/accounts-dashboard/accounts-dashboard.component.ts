import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { Observable } from 'rxjs/Observable';
import { AccountsService } from '../accounts.service';
import { TransactionHistory } from '../transaction-history.model';
import { Account } from '../account.model';
import { AccountType } from '../account-type.enum';
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
  working = false;

  constructor(private accountsService: AccountsService) { }

  ngOnInit() {
    this.working = true;

    this.accountsService.getAccounts()
      .subscribe(accounts => {
        this.accounts = accounts;
        this.working = false;
        this.buildLineCharts(this.accounts);
      });

    this.accountsService.getRecentTransactions()
      .subscribe(transactions => this.transactions = transactions);
  }

  get cashAccounts(): Array<Account> {
    if (!this.accounts) {
      return null;
    }
    return this.accounts.filter(account => account.type !==  AccountType.Credit);
  }

  get creditAccounts(): Array<Account> {
    if (!this.accounts) {
      return null;
    }
    return this.accounts.filter(account => account.type ===  AccountType.Credit);
  }

  get totalCashBalance(): number {
    if (!this.cashAccounts) {
      return 0;
    }
    let balance = 0;
    for (let i = 0; i < this.cashAccounts.length; i++){
      balance += this.cashAccounts[i].balance;
    }
    return balance;
  }

  get totalCreditBalance(): number {
    if (!this.creditAccounts) {
      return 0;
    }
    let balance = 0;
    for (let i = 0; i < this.creditAccounts.length; i++){
      balance += this.creditAccounts[i].balance;
    }
    return balance;
  }

  private buildLineCharts(accounts: Array<Account>): void {
    for (let i = 0; i < accounts.length; i++) {
      const lineChart = {
        data: [],
        labels: [],
        options: { scales: {} },
        colors: [],
        legend: false,
        type: 'line'
      };
      const scales = {
        xAxes: [{
          display: false,
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        yAxes: [{
          display: false,
          gridLines: {
            display: false,
            drawBorder: false
          }
        }]
      };
      lineChart.options.scales = scales;
      const lineData: any = { data: [], label: '', lineTension: 0 };

      const account = accounts[i];
      if (account.type !== AccountType.Credit) {
        lineChart.colors.push({
          backgroundColor: 'rgba(0, 134, 222, 0.2)',
          borderColor: 'rgba(0, 134, 222, 1)'
        });
      } else {
        lineChart.colors.push(          {
          backgroundColor: 'rgba(255, 134, 5, 0.2)',
          borderColor: 'rgba(255, 134, 5, 1)'
        });
      }

      const transactions = account.transactions.reverse();
      for (let j = 0; j < transactions.length; j++) {
        lineChart.labels.push('');
        lineData.data.push(transactions[j].balance);
      }
      lineChart.data.push(lineData);
      account.chart = lineChart;
    }
  }
}
