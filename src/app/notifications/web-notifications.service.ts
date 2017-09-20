export class WebNotificationsService {

  private permission: string;

  requestPermission(): void {
    if (!('Notification' in window)) {
      return;
    }

    if (this.permission !== 'denied') {
      Notification.requestPermission(permission => {
        this.permission = permission;
      });
    }
  }

  displayNotification(title: string, body: string): void {
    if (this.permission === 'denied') {
      return;
    }
    const notification = new Notification(title, { body, icon: '/favicon.ico', tag: 'notification' });
  }
}
