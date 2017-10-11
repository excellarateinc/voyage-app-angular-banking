import { AccountType } from './account-type.enum';
import { Transaction } from './transaction.model';

export class Account {
  accountId: number;
  accountNumber: string;
  name: string;
  type: AccountType;
  balance: number;
  transactions: Array<Transaction>;
  chart: any;
}
