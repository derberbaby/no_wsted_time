import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from './../../user.service';
import { User } from './../../user';
import { CreateService } from './../../create.service';
import { Create } from './../../create';

@Component({
  selector: 'app-messagecreate',
  templateUrl: './messagecreate.component.html',
  styleUrls: ['./messagecreate.component.css']
})
export class MessagecreateComponent implements OnInit {

	@Output() newMessageEvent = new EventEmitter();
	user: User;

	newMessage={
		name:'',
		message: ''
}

  constructor(
  	private _userService: UserService
  	) { }

  ngOnInit() {
  	this._userService.serviceCheckSessionUser()
  	.then( user => {
  		this.user = user;
  		this.newMessage.name = this.user.name.split(' ')[0];
  	} )
  	.catch()
  }

  createMessage(){
  	this.newMessageEvent.emit(this.newMessage);
  	this.newMessage.name = this.user.name.split(' ')[0];
  	this.newMessage.message =  '';
  }
}
