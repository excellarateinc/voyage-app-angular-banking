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
  templateUrl: './accounts-dashboard.component.html'
})
export class AccountsDashboardComponent implements OnInit {
  transactions: Array<Transaction>;
  accounts: Array<Account>;
  barChart: any;
  doughnutCharts: any;
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
          backgroundColor: '#0d47a1'
        },
        {
          backgroundColor: '#283593'
        },
        {
          backgroundColor: '#5f5fc4'
        },
        {
          backgroundColor: '#58a5f0'
        }
      ],
      legend: true,
      type: 'bar'
    };

    for (let i = 0; i < accounts.length; i++) {
      this.barChart.data.push({
        data: [ accounts[i].balance ],
        label: accounts[i].name
      });
    }
  }

  private buildDoughnutCharts(history: Array<TransactionHistory>): any {
    this.doughnutCharts = {
      charts: [],
      labels: ['Deposits', 'Withdrawals'],
      type: 'doughnut',
      colors: [
        { backgroundColor: ['#3793cc', '#3cbfa4'] }
      ],
      options: { maintainAspectRatio: true }
    };
    for (let i = 0; i < history.length; i++) {
      const data = this.buildData(history[i]);
      this.doughnutCharts.charts.push({ data: data, title: history[i].accountName });
    }
  }

  private buildData(item: TransactionHistory): Array<number> {
      const deposits = item.transactions.filter((transaction) => {
        return transaction.type === TransactionType.Deposit;
      });

      const withdrawals = item.transactions.filter((transaction) => {
        return transaction.type === TransactionType.Withdrawal;
      });

      let totalDeposits = 0;
      for (let i = 0; i < deposits.length; i++) {
        totalDeposits += deposits[i].amount;
      }

      let totalWithdrawals = 0;
      for (let i = 0; i < withdrawals.length; i++) {
        totalWithdrawals += withdrawals[i].amount;
      }

      return [totalDeposits, totalWithdrawals];
  }
}
