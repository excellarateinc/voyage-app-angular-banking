import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MobileService } from '../core/mobile.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit {
  isMobile: boolean;
  isAuthenticated: boolean;
  @ViewChild('sidebar') sidebar: SidebarComponent;
  private watcher: Subscription;

  constructor(
    private authService: AuthenticationService,
    private mobileService: MobileService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getToken() != null;
    this.isMobile = this.mobileService.isMobile();
    this.watcher = this.mobileService.mobileChanged$.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
  }

  onToggleSidebar($event: any): void {
    this.sidebar.toggle();
  }
}
