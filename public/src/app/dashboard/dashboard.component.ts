import { Component, OnInit, OnDestroy } from '@angular/core';
import { DateObservableService } from './../date-observable.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { User } from './../user';
import { UserService } from './../user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;
  first_name;
  today = new Date;
	newDate;
	subscription: Subscription;
  pending_invites;

  constructor(private _dateObservableService: DateObservableService, private _userService: UserService) {
   }

  ngOnInit() {
    this.newDate = this.today;
    this.checkSession();
  }

  changedDate(clicked_date) {
    this.newDate = clicked_date.date;
  }

  checkSession() {
      this._userService.serviceCheckSessionUser().then( (user) => {
      this.user = user;
      this.pending_invites = this.user.pending;
      this.first_name = this.user.name.split(' ')[0]}).catch();
  }

  onAccept(pending_index) {
    this._userService.serviceUserAccept(pending_index).then( data => {this.checkSession()}).catch();
  }

  onReject(pending_index) {
    this._userService.serviceUserReject(pending_index).then( data => {this.checkSession()}).catch();
  }

  logout() {
    this._userService.serviceLogout()
    .then().catch();
  }

}
