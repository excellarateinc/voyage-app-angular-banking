import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatService } from './chat.service';
import { ChatComponent } from './chat.component';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  declarations: [ChatComponent],
  providers: [ ChatService ]
})
export class ChatModule { }
