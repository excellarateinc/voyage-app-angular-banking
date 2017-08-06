import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AccountsDashboardComponent } from './banking/accounts-dashboard/accounts-dashboard.component';
import { TransferComponent } from './banking/transfer/transfer.component';
import { AccountsService } from './banking/accounts.service';
import { CreateAccountComponent } from './banking/create-account/create-account.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    ChartsModule,
    ExamplesRoutingModule
  ],
  declarations: [AccountsDashboardComponent, ProfileComponent, TransferComponent, CreateAccountComponent],
  exports: [AccountsDashboardComponent],
  providers: [ AccountsService ]
})
export class ExamplesModule { }
