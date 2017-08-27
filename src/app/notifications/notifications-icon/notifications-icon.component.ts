import { Component, OnInit, Input } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { NotificationsService } from '../notifications.service';
import { Notification } from '../notification.model';
import { SignalR } from 'ng2-signalr';

@Component({
  selector: 'app-notifications-icon',
  templateUrl: './notifications-icon.component.html'
})
export class NotificationsIconComponent implements OnInit {
  notifications: Array<Notification> = [];
  private readonly notificationMessage = 'newNotification';

  constructor(
    private notificationsService: NotificationsService,
    private signalR: SignalR,
    private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.getNotifications();
    this.listenForPushNotifications();
  }

  getNotifications(): void {
    this.notificationsService.getNotifications()
      .subscribe(result => this.notifications = result);
  }

  markNotificationRead(id: number): void {
    this.notificationsService.markNotificationAsRead(id)
      .subscribe(result => {
        this.notifications = this.notifications.filter((item: Notification) => item.id !== id);
      });
  }

  markAllRead(): void {
    this.notificationsService.markAllRead()
      .subscribe(() => this.notifications = []);
  }

  private listenForPushNotifications(): void {
    this.signalR.connect().then(connection => {
      connection.listenFor(this.notificationMessage)
        .subscribe((notification: Notification) => {
          this.onPushReceived(notification);
      });
    });
  }

  private onPushReceived(notification: Notification): void {
    this.notifications.unshift(notification);
    this.snackBar.open(notification.description, null, { duration: 3000 });
  }
}
