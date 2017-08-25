import { Component, OnInit, Input } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { Notification } from '../notification.model';
import { SignalR } from 'ng2-signalr';

@Component({
  selector: 'app-notifications-icon',
  templateUrl: './notifications-icon.component.html'
})
export class NotificationsIconComponent implements OnInit {
  notifications: Array<Notification>;

  constructor(
    private notificationsService: NotificationsService,
    private signalR: SignalR) { }

  ngOnInit() {
    this.getNotifications();
    this.signalR.connect().then(connection => {
      connection.listenFor('broadcastMessage').subscribe((notification: string) => {
        this.notifications.push(JSON.parse(notification));
      });
    });
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
      .subscribe(() => this.notifications = null);
  }
}
