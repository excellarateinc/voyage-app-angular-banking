import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminRoutingModule } from './admin-routing.module';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { UserAdminService } from './user-admin/user-admin.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  declarations: [UserAdminComponent],
  providers: [
    UserAdminService
  ]
})
export class AdminModule { }
