import { Component, OnInit } from '@angular/core';
import { User } from '../../core/user/user.model';
import { UserStatus } from '../../core/user/user-status.model';
import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  users: Array<User>;
  selectedUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(result => this.users = result);
  }

  onToggle(): void {
    const userStatus = new UserStatus();
    userStatus.isActive = this.selectedUser.isActive;
    userStatus.isVerifyRequired = this.selectedUser.isVerifyRequired;
    this.userService.toggleStatus(this.selectedUser.id, userStatus)
      .subscribe(result => { });
  }
}
