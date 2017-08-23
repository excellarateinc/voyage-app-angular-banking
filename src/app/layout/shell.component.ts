import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../authentication/authentication.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BroadcastService } from '../core/broadcast.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit {
  isMobile: boolean;
  isAuthenticated: boolean;
  @ViewChild('sidebar') sidebar: SidebarComponent;
  inMobileForm: boolean;
  private watcher: Subscription;
  private broadcast: Subscription;

  constructor(
    private authService: AuthenticationService,
    private media: ObservableMedia,
    private broadcastService: BroadcastService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getToken() != null;
    this.isMobile = this.media.isActive('xs') || this.media.isActive('sm');
    this.watcher = this.media.subscribe((change: MediaChange) => {
      this.isMobile = change.mqAlias === 'xs' || change.mqAlias === 'sm';
    });

    this.broadcast = this.broadcastService.inMobileForm$
      .subscribe(inMobileForm => {
        this.inMobileForm = this.isMobile && inMobileForm;
        this.cdr.detectChanges();
      });
  }

  onToggleSidebar($event: any): void {
    this.sidebar.toggle();
  }
}
