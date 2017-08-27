import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NotificationsService } from './notifications.service';
import { NotificationsIconComponent } from './notifications-icon/notifications-icon.component';
import { environment } from '../../environments/environment';
import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';

export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'notificationHub';
  c.url = environment.SIGNALR_URL;
  c.qs = { access_token: sessionStorage.getItem('voyage.token') };
  return c;
}

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SignalRModule.forRoot(createConfig)
  ],
  declarations: [NotificationsIconComponent],
  providers: [
    NotificationsService
  ],
  exports: [NotificationsIconComponent]
})
export class NotificationsModule { }
