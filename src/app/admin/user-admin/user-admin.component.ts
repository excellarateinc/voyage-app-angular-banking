import { Component, OnInit } from '@angular/core';
import { UserAdminService } from './user-admin.service';
import { User } from './user.model';
import { UserStatus } from './user-status.model';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  users: Array<User>;
  selectedUser: User;

  constructor(private userAdminService: UserAdminService) { }

  ngOnInit() {
    this.userAdminService.getUsers()
      .subscribe(result => this.users = result);
  }

  onToggle(): void {
    const userStatus = new UserStatus();
    userStatus.isActive = this.selectedUser.isActive;
    userStatus.isVerifyRequired = this.selectedUser.isVerifyRequired;
    this.userAdminService.toggleStatus(this.selectedUser.id, userStatus)
      .subscribe(result => { });
  }
}
