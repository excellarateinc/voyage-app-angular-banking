import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user/user.service';
import { BroadcastService } from './broadcast.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ UserService ]
})
export class CoreModule { }
